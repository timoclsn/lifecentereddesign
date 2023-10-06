'use server';

import { auth } from '@clerk/nextjs';
import { createAction, createProtectedAction } from 'lib/serverActions/create';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
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

export const like = createAction({
  input: inputSchema,
  action: async ({ input }) => {
    const { id, type } = input;
    const { userId } = auth();

    if (userId) {
      await likeResource(userId, id, type);
    } else {
      await anonymousLikeResource(id, type);
    }

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});

export const unLike = createProtectedAction({
  input: inputSchema,
  action: async ({ input, ctx }) => {
    const { id, type } = input;
    const { userId } = ctx;

    await unlikeResource(userId, id, type);

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});
