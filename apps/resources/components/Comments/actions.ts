'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { resourceCommentsTag } from '../../lib/cache';
import {
  addResourceComment,
  deleteResourceComment,
  resourceTypes,
} from '../../lib/resources';
import { textSchema } from './schemas';

export const addComment = createProtectedAction({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: textSchema,
  }),
  action: async ({ input, ctx }) => {
    const { id, type, text } = input;
    const { userId } = ctx;

    await addResourceComment(userId, id, type, text);
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
    const { userId } = ctx;

    if (userId !== commentUserId) {
      throw new Error('You can only delete your own comments');
    }

    await deleteResourceComment(commentId, userId);

    const tag = resourceCommentsTag(resourceId, resourceType);
    revalidateTag(tag);
  },
});
