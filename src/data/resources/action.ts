'use server';

import {
  createAction,
  createAdminAction,
  createProtectedAction,
} from '@/data/clients';
import { db } from '@/lib/db';
import { and, eq } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import nodemailer from 'nodemailer';
import OpenAI from 'openai';
import { z } from 'zod';
import {
  comment,
  like as likeSchema,
  resource,
  resourceToCreator,
  resourceToTopic,
} from '../../db/schema';
import { resourceCommentsTag } from './query';
import { selectThoughtleaders } from './resources';
import { selectTypes } from '../types/types';
import { selectCategories } from '../categories/categories';
import { selectTopics } from '../topics/topics';

const { SUGGESTION_MAIL_PASSWORD } = process.env;

export const add = createAdminAction({
  input: z.object({
    id: z.string(),
    name: z.string(),
    suggestion: z.boolean().optional(),
    link: z.string(),
    typeId: z.number(),
    categoryId: z.number(),
    topicIds: z.array(z.number()).optional(),
    description: z.string().optional(),
    details: z.string().optional(),
    note: z.string().optional(),
    date: z.date().optional(),
    datePlain: z.string().optional(),
    creatorIds: z.array(z.string()).optional(),
    creatorsPlain: z.string().optional(),
  }),
  action: async ({ input, ctx }) => {
    const { db } = ctx;

    console.log(input);

    await db.insert(resource).values({
      id: input.id,
      name: input.name,
      suggestion: input.suggestion,
      link: input.link,
      typeId: input.typeId,
      categoryId: input.categoryId,
      description: input.description,
      details: input.details,
      note: input.note,
      date: input.date,
      datePlain: input.datePlain,
      creatorsPlain: input.creatorsPlain,
    });

    if (input.topicIds) {
      await db.insert(resourceToTopic).values(
        input.topicIds.map((topicId) => ({
          resourceId: input.id,
          topicId,
        })),
      );
    }

    if (input.creatorIds) {
      await db.insert(resourceToCreator).values(
        input.creatorIds.map((creatorId) => ({
          resourceId: input.id,
          creatorId,
        })),
      );
    }

    revalidatePath('/');
  },
});

export const like = createProtectedAction({
  input: z.object({
    id: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { id } = input;
    const { userId } = ctx;

    await db.insert(likeSchema).values({
      resourceId: id,
      userId,
    });

    revalidatePath('/');
  },
});

export const unLike = createProtectedAction({
  input: z.object({
    id: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { id } = input;
    const { userId } = ctx;

    await db
      .delete(likeSchema)
      .where(and(eq(likeSchema.resourceId, id), eq(likeSchema.userId, userId)));

    revalidatePath('/');
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
    const { userId } = ctx;

    await db.insert(comment).values({
      resourceId: id,
      userId,
      text,
    });

    const tag = resourceCommentsTag(id);
    revalidateTag(tag);
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
    const { userId } = ctx;

    if (userId !== commentUserId) {
      throw new Error('You can only delete your own comments');
    }

    await db.delete(comment).where(eq(comment.id, commentId));

    const tag = resourceCommentsTag(resourceId);
    revalidateTag(tag);
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

    try {
      await transporter.sendMail(mailData);
    } catch (e) {
      console.error(e);
      throw new Error(
        'There was an error submitting your suggestion. Please try again or send it via email at hello@lifecentereddesign.net.',
      );
    }
  },
});

export const getThoughtleaders = createAction({
  action: async () => {
    return await selectThoughtleaders();
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

    const urlResponse = await fetch(link);
    const websiteSource = await urlResponse.text();

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

    const [types, categories, topcis] = await Promise.all([
      selectTypes(),
      selectCategories(),
      selectTopics(),
    ]);

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

    const aiResponse = await openai.chat.completions.create({
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
    });

    const content = aiResponse.choices[0].message.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    const contentJson = JSON.parse(content);

    return analizeLinkSchema.parse(contentJson);
  },
});
