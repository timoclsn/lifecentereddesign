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

const { SUGGESTION_MAIL_PASSWORD } = process.env;

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
  id: z.string(),
  name: z.string(),
  suggestion: z.boolean().optional(),
  link: z.string(),
  typeId: z.string(),
  categoryId: z.string(),
  topicIds: z.array(z.string()).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  details: z.string().optional(),
  note: z.string().optional(),
  date: z.date().optional(),
  datePlain: z.string().optional(),
  relatedResourceIds: z.array(z.string()).optional(),
  relatedResourcesPlain: z.string().optional(),
});

export const addResource = createAdminAction({
  input: addOrEditResourceSchema,
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    await db
      .insert(resource)
      .values({
        id: input.id,
        name: input.name,
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
      .catch((error) => {
        throw new ActionError({
          message: 'Error adding resource',
          log: 'Error adding resource to resources table',
          cause: error,
        });
      });

    if (input.topicIds && input.topicIds.length > 0) {
      await db
        .insert(resourceToTopic)
        .values(
          input.topicIds.map((topicId) => ({
            resourceId: input.id,
            topicId,
          })),
        )
        .catch((error) => {
          throw new ActionError({
            message: 'Error adding resource',
            log: 'Error adding resource to resourceToTopic table',
            cause: error,
          });
        });
    }

    if (input.relatedResourceIds && input.relatedResourceIds.length > 0) {
      await db
        .insert(resourceToRelatedResource)
        .values(
          input.relatedResourceIds.map((relatedResourceId) => ({
            resourceId: input.id,
            relatedResourceId,
          })),
        )
        .catch((error) => {
          throw new ActionError({
            message: 'Error adding resource',
            log: 'Error adding resource to resourceToRelatedResource table',
            cause: error,
          });
        });
    }

    revalidateTag('resources');
  },
});

export const editResource = createAdminAction({
  input: addOrEditResourceSchema,
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    await db
      .update(resource)
      .set({
        name: input.name,
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
      .catch((error) => {
        throw new ActionError({
          message: 'Error editing resource',
          log: 'Error updating resource in resources table',
          cause: error,
        });
      });

    if (input.topicIds && input.topicIds.length > 0) {
      await db
        .delete(resourceToTopic)
        .where(eq(resourceToTopic.resourceId, input.id))
        .catch((error) => {
          throw new ActionError({
            message: 'Error editing resource',
            log: 'Error deleting resource from resourceToTopic table',
            cause: error,
          });
        });

      await db
        .insert(resourceToTopic)
        .values(
          input.topicIds.map((topicId) => ({
            resourceId: input.id,
            topicId,
          })),
        )
        .catch((error) => {
          throw new ActionError({
            message: 'Error adding resource',
            log: 'Error adding resource to resourceToTopic table',
            cause: error,
          });
        });
    }

    if (input.relatedResourceIds && input.relatedResourceIds.length > 0) {
      await db
        .delete(resourceToRelatedResource)
        .where(eq(resourceToRelatedResource.resourceId, input.id))
        .catch((error) => {
          throw new ActionError({
            message: 'Error editing resource',
            log: 'Error deleting resource from resourceToRelatedResource table',
            cause: error,
          });
        });

      await db
        .insert(resourceToRelatedResource)
        .values(
          input.relatedResourceIds.map((relatedResourceId) => ({
            resourceId: input.id,
            relatedResourceId,
          })),
        )
        .catch((error) => {
          throw new ActionError({
            message: 'Error adding resource',
            log: 'Error adding resource to resourceToRelatedResource table',
            cause: error,
          });
        });
    }

    revalidateTag('resources');
  },
});

export const deleteResource = createAdminAction({
  input: z.object({
    id: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    await db
      .delete(resourceToTopic)
      .where(eq(resourceToTopic.resourceId, input.id))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting topics from resourceToTopic table',
          cause: error,
        });
      });

    await db
      .delete(resourceToRelatedResource)
      .where(eq(resourceToRelatedResource.resourceId, input.id))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting related resources from resourceToRelatedResource table',
          cause: error,
        });
      });

    await db
      .delete(likeSchema)
      .where(eq(likeSchema.resourceId, input.id))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting resource likes from likes table',
          cause: error,
        });
      });

    await db
      .delete(comment)
      .where(eq(comment.resourceId, input.id))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting resource comments from comments table',
          cause: error,
        });
      });

    await db
      .delete(resource)
      .where(eq(resource.id, input.id))
      .catch((error) => {
        throw new ActionError({
          message: 'Error deleting resource',
          log: 'Error deleting resource from resources table',
          cause: error,
        });
      });

    revalidateTag('resources');
    redirect('/resources');
  },
});

export const like = createAction({
  input: z.object({
    id: z.string(),
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
    id: z.string(),
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
    id: z.string(),
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
    resourceId: z.string(),
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
  description: z.string(),
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
        I am going to give you the content of a website i am also goinf to give you input data that you are going to use to categorize the website. These are your instructions:

        - Choose which type, categroy and topcis are the most relevant for the website.
        - You are going to answer in JSON format. This is the format you are going to use:
        {
          name: 'Name of the website',
          type: 1,
          category: 1,
          topics: [1, 2, 3],
          description: 'Description of the website',
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
      apiKey: process.env.OPENAI_API_KEY!,
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
              'You are my AI web scraper. Your job is to make sense of the text content of a website and put it into a category.',
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
