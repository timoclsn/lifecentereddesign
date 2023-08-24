'use server';

import { auth } from '@clerk/nextjs';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAction } from '../../lib/actions/createAction';
import {
  addResourceComment,
  deleteResourceComment,
  resourceCommentsCountTag,
  resourceCommentsTag,
  resourceTypes,
} from '../../lib/resources';
import { textSchema } from './schemas';

export const addComment = createAction(
  z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    text: textSchema,
  }),
)(async ({ id, type, text }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await addResourceComment(userId, id, type, text);

  revalidateTag(resourceCommentsTag(id, type));
  revalidateTag(resourceCommentsCountTag(id, type));
});

export const deleteComment = createAction(
  z.object({
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
    commentId: z.number(),
    commentUserId: z.string(),
  }),
)(async ({ resourceId, resourceType, commentId, commentUserId }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  if (userId !== commentUserId) {
    throw new Error('You can only delete your own comments');
  }

  await deleteResourceComment(commentId, userId);

  revalidateTag(resourceCommentsTag(resourceId, resourceType));
  revalidateTag(resourceCommentsCountTag(resourceId, resourceType));
});
