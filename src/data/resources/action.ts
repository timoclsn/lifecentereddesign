'use server';

import {
  createAction,
  createAdminAction,
  createProtectedAction,
} from '@/data/clients';
import { ActionError } from '@/lib/data/errors';
import { and, eq, sql } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';
import { z } from 'zod';
import {
  comment,
  like as likeSchema,
  resource,
  resourceToRelatedResource,
  resourceToTopic,
} from '../../db/schema';
import { selectCategories } from '../categories/categories';
import { revalidateTag } from '../tags';
import { selectTopics } from '../topics/topics';
import { selectTypes } from '../types/types';

const { SUGGESTION_MAIL_PASSWORD, OPENAI_API_KEY } = process.env;

export const getResources = createAction({
  action: async ({ ctx }) => {
    const { db } = ctx;
    return await db.query.resource.findMany({
      columns: {
        id: true,
        name: true,
      },
      orderBy: (resource, { asc }) => asc(resource.name),
    });
  },
});

const addOrEditResourceSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  suggestion: z.boolean().optional(),
  link: z.string(),
  typeId: z.number(),
  categoryId: z.number(),
  topicIds: z.array(z.number()).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  details: z.string().optional(),
  note: z.string().optional(),
  date: z.date().optional(),
  datePlain: z.string().optional(),
  relatedResourceIds: z.array(z.number()).optional(),
  relatedResourcesPlain: z.string().optional(),
});

export const addResource = createAdminAction({
  input: addOrEditResourceSchema,
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    await db
      .transaction(async (tx) => {
        const [newResource] = await tx
          .insert(resource)
          .values({
            name: input.name,
            slug: input.slug,
            suggestion: input.suggestion,
            link: input.link,
            typeId: input.typeId,
            categoryId: input.categoryId,
            shortDescription: input.shortDescription,
            description: input.description,
            details: input.details,
            note: input.note,
            date: input.date,
            datePlain: input.datePlain,
            relatedResourcesPlain: input.relatedResourcesPlain,
          })
          .returning();

        if (input.topicIds && input.topicIds.length > 0) {
          await tx.insert(resourceToTopic).values(
            input.topicIds.map((topicId) => ({
              resourceId: newResource.id,
              topicId,
            })),
          );
        }

        if (input.relatedResourceIds && input.relatedResourceIds.length > 0) {
          await tx.insert(resourceToRelatedResource).values(
            input.relatedResourceIds.map((relatedResourceId) => ({
              resourceId: newResource.id,
              relatedResourceId,
            })),
          );
        }
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error adding resource',
          log: 'Error adding resource to database',
          cause: error,
        });
      });

    revalidateTag('resources');
  },
});

export const editResource = createAdminAction({
  input: addOrEditResourceSchema,
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    const slug = await db
      .transaction(async (tx) => {
        const [editedResource] = await tx
          .update(resource)
          .set({
            name: input.name,
            slug: input.slug,
            suggestion: input.suggestion,
            link: input.link,
            typeId: input.typeId,
            categoryId: input.categoryId,
            shortDescription: input.shortDescription,
            description: input.description,
            details: input.details,
            note: input.note,
            date: input.date,
            datePlain: input.datePlain,
            relatedResourcesPlain: input.relatedResourcesPlain,
          })
          .where(eq(resource.id, input.id))
          .returning();

        if (input.topicIds && input.topicIds.length > 0) {
          await tx
            .delete(resourceToTopic)
            .where(eq(resourceToTopic.resourceId, input.id));

          await tx.insert(resourceToTopic).values(
            input.topicIds.map((topicId) => ({
              resourceId: input.id,
              topicId,
            })),
          );
        }

        if (input.relatedResourceIds && input.relatedResourceIds.length > 0) {
          await tx
            .delete(resourceToRelatedResource)
            .where(eq(resourceToRelatedResource.resourceId, input.id));

          await tx.insert(resourceToRelatedResource).values(
            input.relatedResourceIds.map((relatedResourceId) => ({
              resourceId: input.id,
              relatedResourceId,
            })),
          );
        }

        return editedResource.slug;
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error editing resource',
          log: 'Error editing resource in database',
          cause: error,
        });
      });

    revalidateTag('resources');
    redirect(`/resources/${slug}`);
  },
});

export const deleteResource = createAdminAction({
  input: z.object({
    id: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    await db
      .transaction(async (tx) => {
        await tx
          .delete(resourceToTopic)
          .where(eq(resourceToTopic.resourceId, input.id));

        await tx
          .delete(resourceToRelatedResource)
          .where(eq(resourceToRelatedResource.resourceId, input.id));

        await tx.delete(likeSchema).where(eq(likeSchema.resourceId, input.id));

        await tx.delete(comment).where(eq(comment.resourceId, input.id));

        await tx.delete(resource).where(eq(resource.id, input.id));
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting resource from database',
          cause: error,
        });
      });

    revalidateTag('resources');
    redirect('/resources');
  },
});

export const like = createAction({
  input: z.object({
    id: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { id } = input;
    const { db, userId } = ctx;

    const likeResourceError = 'Error liking resource';

    if (userId) {
      await db
        .insert(likeSchema)
        .values({
          resourceId: id,
          userId,
        })
        .catch((error) => {
          throw new ActionError({
            message: likeResourceError,
            log: 'Error adding like to likes table',
            cause: error,
          });
        });

      revalidateTag('likedResourcesCount', userId);
    } else {
      await db
        .update(resource)
        .set({
          anonymousLikesCount: sql`${resource.anonymousLikesCount} + 1`,
        })
        .where(eq(resource.id, id))
        .catch((error) => {
          throw new ActionError({
            message: likeResourceError,
            log: 'Error updating anonymousLikesCount in resources table',
            cause: error,
          });
        });
    }

    revalidateTag('resources');
  },
});

export const unLike = createProtectedAction({
  input: z.object({
    id: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { id } = input;
    const { userId, db } = ctx;

    await db
      .delete(likeSchema)
      .where(and(eq(likeSchema.resourceId, id), eq(likeSchema.userId, userId)))
      .catch((error) => {
        throw new ActionError({
          message: 'Error un-liking resource',
          log: 'Error deleting like from likes table',
          cause: error,
        });
      });

    revalidateTag('likedResourcesCount', userId);
    revalidateTag('resources');
  },
});

export const addComment = createProtectedAction({
  input: z.object({
    id: z.number(),
    text: z
      .string()
      .min(3, { message: 'Your comment has to be at least 3 characters.' })
      .max(300, {
        message: 'Your comment cannot be longer than 300 characters.',
      }),
  }),
  action: async ({ input, ctx }) => {
    const { id, text } = input;
    const { userId, db } = ctx;

    await db
      .insert(comment)
      .values({
        resourceId: id,
        userId,
        text,
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error adding comment',
          log: 'Error adding comment to comments table',
          cause: error,
        });
      });

    revalidateTag('resourceComments', id);
  },
});

export const deleteComment = createProtectedAction({
  input: z.object({
    resourceId: z.number(),
    commentId: z.number(),
    commentUserId: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { resourceId, commentId, commentUserId } = input;
    const { userId, db } = ctx;

    if (userId !== commentUserId) {
      throw new ActionError({
        message: 'You can only delete your own comments',
        log: `User ${userId} tried to delete comment ${commentId} from user ${commentUserId}`,
      });
    }

    await db
      .delete(comment)
      .where(eq(comment.id, commentId))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting comment',
          log: 'Error deleting comment from comments table',
          cause: error,
        });
      });

    revalidateTag('resourceComments', resourceId);
  },
});

export const suggest = createAction({
  input: z.object({
    link: z.string().min(1, { message: 'Link is required' }).url({
      message: 'Must be a valid URL',
    }),
    message: z.string().optional(),
    name: z.string().optional(),
  }),
  action: async ({ input }) => {
    const { link, message, name } = input;

    const transporter = nodemailer.createTransport({
      port: 465,
      host: 'sslout.de',
      auth: {
        user: 'suggestion@lifecentereddesign.net',
        pass: SUGGESTION_MAIL_PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: 'suggestion@lifecentereddesign.net',
      to: 'hello@lifecentereddesign.net',
      subject: 'Resource Suggestion',
      text: `Link: ${link}\nMessage: ${
        message ? message : 'No message provided'
      }\nName: ${name ? name : 'No name provided'}`,
    };

    await transporter.sendMail(mailData).catch((error) => {
      throw new ActionError({
        message:
          'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
        log: 'Error sending suggestion email',
        cause: error,
      });
    });
  },
});

const analizeLinkSchema = z.object({
  name: z.string(),
  type: z.number(),
  category: z.number(),
  topics: z.array(z.number()),
  shortDescription: z.string().nullable(),
  description: z.string(),
  date: z
    .string()
    .date()
    .transform((date) => new Date(date))
    .nullable(),
});

export const analizeLink = createAdminAction({
  input: z.object({
    link: z.string().url(),
  }),
  action: async ({ input }) => {
    const { link } = input;

    const urlResponse = await fetch(link).catch((error) => {
      throw new ActionError({
        message: 'Error analyzing link',
        log: 'Error fetching website content',
        cause: error,
      });
    });

    const websiteSource = await urlResponse.text().catch((error) => {
      throw new ActionError({
        message: 'Error analyzing link',
        log: 'Error reading website content',
        cause: error,
      });
    });

    const titleRegex = /<title>(.*?)<\/title>/i;
    const titleMatch = websiteSource.match(titleRegex);
    const title = titleMatch ? titleMatch[1] : '';

    const descriptionRegex = /<meta\s+name="description"\s+content="([^"]*)"/i;
    const descriptionMatch = websiteSource.match(descriptionRegex);
    const description = descriptionMatch ? descriptionMatch[1] : '';

    const websiteTextClean =
      websiteSource
        // Remove script tag content
        .replace(
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          '<script></script>',
        )
        // Remove style tag content
        .replace(
          /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
          '<style></style>',
        )
        // Remove all xml tags
        .replace(/<[^>]*>/g, '|')
        // Replace all line breaks
        .replace(/\r?\n|\r/g, '')
        // Replace multiple spaces
        .replace(/ {2,}/g, '')
        // Replace multiple dots with one
        .replace(/\.{2,}/g, '. ')
        // Replace multiple pipes with one
        .replace(/\|{2,}/g, '|')
        // Only use the first 10000 characters
        .substring(0, 10000) + '...';

    if (!websiteTextClean) {
      throw new ActionError({
        message: 'Error analyzing link',
        log: 'Could not get website content',
      });
    }

    const [types, categories, topcis] = await Promise.all([
      selectTypes(),
      selectCategories(),
      selectTopics(),
    ]).catch((error) => {
      throw new ActionError({
        message: 'Error analyzing link',
        log: 'Error getting types, categories and topics from database',
        cause: error,
      });
    });

    const prompt = `
        I am going to give you the content of a website that you are going to use to categorize the website.
        
        These are your instructions:
        - Choose which type, categroy and topcis are the most relevant for the website.
        - If the website is of a single person the type is most likely "Thoughtleader".
        - If the type is "Thoughtleader" the name should be the name of the person.
        - If the type is "Thoughtleader" the short description should be their job title or profession otherwise it should be null.
        - Don't set more than 3 topics. Only set the most relevant ones that you are very confident with (7 or higher in a scale from 0 to 10).
        - Answer in english only.
        - If the website content is of a peace of media (book, article, podcast etc.) fill the date with the date of the publication (ISO date string) otherwise it should be null.
        - Keep the description short and to the point (3 sentences max).

        You are going to answer in JSON format. This is the format you are going to use:
        {
          name: 'Name of the website',
          type: 1,
          category: 1,
          topics: [1, 2, 3],
          shortDescription: 'UX Designer',
          description: 'Description of the website',
          date: '2022-01-01'
        }

        TYPES: ${JSON.stringify(types)}
        CATEGORIES: ${JSON.stringify(categories)}
        TOPICS: ${JSON.stringify(topcis)}
    
        WEBSITE TITLE: ${title}
    
        WEBSITE DESCRIPTION: ${description}
    
        WEBSITE CONTENT: \`\`\`
        ${websiteTextClean}
        \`\`\`
      `;

    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });

    const aiResponse = await openai.chat.completions
      .create({
        model: 'gpt-3.5-turbo',
        stream: false,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content:
              'You are my AI web scraper. Your job is to make sense of the text content of a website and categorize it.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      })
      .catch((error) => {
        throw new ActionError({
          message: 'Error analyzing link',
          log: 'Error getting response from AI',
          cause: error,
        });
      });

    const content = aiResponse.choices[0].message.content;

    if (!content) {
      throw new ActionError({
        message: 'Error analyzing link',
        log: 'No response from AI',
      });
    }

    const contentJson = JSON.parse(content);

    return analizeLinkSchema.parse(contentJson);
  },
});
