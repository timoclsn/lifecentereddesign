'use server';

import { auth } from '@clerk/nextjs';
import { z } from 'zod';
import { createServerAction } from '../../lib/actions';
import {
  anonymousLikeResource,
  likeResource,
  resourceTypes,
  unlikeResource,
} from '../../lib/resources';

const typeSchema = z.enum(resourceTypes);

const inputSchema = z.object({
  id: z.number(),
  type: typeSchema,
});

export const like = createServerAction(inputSchema)(async ({ id, type }) => {
  const { userId } = auth();

  if (userId) {
    await likeResource(userId, id, type);
  } else {
    await anonymousLikeResource(id, type);
  }
});

export const unLike = createServerAction(inputSchema)(async ({ id, type }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await unlikeResource(userId, id, type);
});
