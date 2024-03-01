'use server';

import { auth } from '@clerk/nextjs/server';
import { createAction, createProtectedAction } from 'data/clients';
import { resourceTypes } from 'lib/resources';
import { revalidateTag } from 'next/cache';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { resourceCommentsTag, resourceLikesTag } from './query';

const { SUGGESTION_MAIL_PASSWORD } = process.env;

export const like = createAction({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { id, type } = input;
    const { db } = ctx;
    const { userId } = auth();

    if (userId) {
      await db.like.create({
        data: {
          userId,
          type,
          resourceId: id,
        },
      });
    } else {
      // @ts-expect-error: Dynamic table access doesn't work on type level
      await prisma[type].update({
        where: {
          id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    }

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});

export const unLike = createProtectedAction({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { id, type } = input;
    const { db, userId } = ctx;

    await db.like.delete({
      where: {
        userId_type_resourceId: {
          userId,
          type,
          resourceId: id,
        },
      },
    });

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});

export const addComment = createProtectedAction({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: z
      .string()
      .min(3, { message: 'Your comment has to be at least 3 characters.' })
      .max(300, {
        message: 'Your comment cannot be longer than 300 characters.',
      }),
  }),
  action: async ({ input, ctx }) => {
    const { id, type, text } = input;
    const { db, userId } = ctx;

    await db.comment.create({
      data: {
        userId,
        resourceId: id,
        type,
        text,
      },
    });
    const tag = resourceCommentsTag(id, type);
    revalidateTag(tag);
  },
});

export const deleteComment = createProtectedAction({
  input: z.object({
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
    commentId: z.number(),
    commentUserId: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { resourceId, resourceType, commentId, commentUserId } = input;
    const { db, userId } = ctx;

    if (userId !== commentUserId) {
      throw new Error('You can only delete your own comments');
    }

    await db.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });

    const tag = resourceCommentsTag(resourceId, resourceType);
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
