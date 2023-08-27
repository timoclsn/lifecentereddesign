'use server';

import { auth } from '@clerk/nextjs';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAction } from '../../lib/actions/createAction';
import { resourceLikesTag } from '../../lib/cache';
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

export const like = createAction(inputSchema)(async ({ id, type }) => {
  const { userId } = auth();

  if (userId) {
    await likeResource(userId, id, type);
  } else {
    await anonymousLikeResource(id, type);
  }

  const tag = resourceLikesTag(id, type);
  revalidateTag(tag);
});

export const unLike = createAction(inputSchema)(async ({ id, type }) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  await unlikeResource(userId, id, type);

  const tag = resourceLikesTag(id, type);
  revalidateTag(tag);
});
