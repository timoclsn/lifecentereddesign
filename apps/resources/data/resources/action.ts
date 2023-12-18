'use server';

import { auth } from '@clerk/nextjs';
import { createAction, createProtectedAction } from 'data/clients';
import { resourceCommentsTag, resourceLikesTag } from 'lib/cache';
import { revalidateTag } from 'next/cache';
import 'server-only';
import { z } from 'zod';
import { resourceTypes } from './query';

export const textSchema = z
  .string()
  .min(3, { message: 'Your comment has to be at least 3 characters.' })
  .max(300, { message: 'Your comment cannot be longer than 300 characters.' });

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
    text: textSchema,
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
