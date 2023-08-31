'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAction } from '../../lib/actions/createAction';
import { resourceCommentsTag } from '../../lib/cache';
import {
  addResourceComment,
  deleteResourceComment,
  resourceTypes,
} from '../../lib/resources';
import { textSchema } from './schemas';

export const addComment = createAction({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: textSchema,
  }),
  action: async ({ input, ctx }) => {
    const { id, type, text } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    await addResourceComment(userId, id, type, text);
    const tag = resourceCommentsTag(id, type);
    revalidateTag(tag);
  },
});

export const deleteComment = createAction({
  input: z.object({
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
    commentId: z.number(),
    commentUserId: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { resourceId, resourceType, commentId, commentUserId } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    if (userId !== commentUserId) {
      throw new Error('You can only delete your own comments');
    }

    await deleteResourceComment(commentId, userId);

    const tag = resourceCommentsTag(resourceId, resourceType);
    revalidateTag(tag);
  },
});
