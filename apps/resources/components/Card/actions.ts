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

const typeSchema = z.enum(resourceTypes);

type Input = z.infer<typeof inputSchema>;

const inputSchema = z.object({
  id: z.number(),
  type: typeSchema,
});

export const like = async (input: Input) => {
  const { id, type } = inputSchema.parse(input);
  const { userId } = auth();

  if (userId) {
    await likeResource(userId, id, type);
  } else {
    await anonymousLikeResource(id, type);
  }

  revalidateTag(`likes-${id}-${type}`);
};

export const unLike = async (input: Input) => {
  const { id, type } = inputSchema.parse(input);
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await unlikeResource(userId, id, type);

  revalidateTag(`likes-${id}-${type}`);
};
