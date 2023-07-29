'use server';

import { auth } from '@clerk/nextjs';
import { z } from 'zod';
import {
  anonymousLikeResource,
  likeResource,
  resourceTypes,
  unlikeResource,
} from '../../lib/resources';

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
};
