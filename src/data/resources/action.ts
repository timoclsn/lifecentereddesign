'use server';

import { createAction, createProtectedAction } from '@/data/clients';
import { and, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { revalidatePath, revalidateTag } from 'next/cache';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { comment, like as likeSchema } from '../../db/schema';
import { resourceCommentsTag } from './query';

const { SUGGESTION_MAIL_PASSWORD } = process.env;

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
