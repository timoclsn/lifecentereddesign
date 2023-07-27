'use server';

import { auth } from '@clerk/nextjs';
import {
  anonymousLikeResource,
  likeResource,
  resourceTypes,
  unlikeResource,
} from 'lib/resources';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { likesDataTag } from './LikesButton/LikesButtonServer';

const typeSchema = z.enum(resourceTypes);

type Input = z.infer<typeof inputSchema>;

const inputSchema = z.object({
  id: z.number(),
  type: typeSchema,
});

export const like = async (input: Input) => {
  const result = inputSchema.safeParse(input);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }
  const { id, type } = result.data;

  const { userId } = auth();

  if (userId) {
    await likeResource(userId, id, type);
  } else {
    await anonymousLikeResource(id, type);
  }

  const tag = likesDataTag(id, type);
  revalidateTag(tag);
};

export const unLike = async (input: Input) => {
  const result = inputSchema.safeParse(input);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }
  const { id, type } = result.data;

  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await unlikeResource(userId, id, type);

  const tag = likesDataTag(id, type);
  revalidateTag(tag);
};