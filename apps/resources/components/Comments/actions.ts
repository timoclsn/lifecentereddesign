'use server';

import { auth } from '@clerk/nextjs';

import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAction } from '../../lib/actions/createAction';
import {
  addResourceComment,
  deleteResourceComment,
  resourceComemntsTag,
  resourceCommentsCountTag,
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

  revalidateTag(resourceComemntsTag(id, type));
  revalidateTag(resourceCommentsCountTag(id, type));
});

export const deleteComment = createAction(
  z.object({
    commentId: z.number(),
    commentUserId: z.string(),
  }),
)(async ({ commentId, commentUserId }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  if (userId !== commentUserId) {
    throw new Error('You can only delete your own comments');
  }

  await deleteResourceComment(commentId, userId);

  revalidatePath('/');
});
