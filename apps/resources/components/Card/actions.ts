'use server';

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

export const like = createAction({
  input: inputSchema,
  action: async ({ input, ctx }) => {
    const { id, type } = input;
    const { userId } = ctx;

    if (userId) {
      await likeResource(userId, id, type);
    } else {
      await anonymousLikeResource(id, type);
    }

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});

export const unLike = createAction({
  input: inputSchema,
  action: async ({ input, ctx }) => {
    const { id, type } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    await unlikeResource(userId, id, type);

    const tag = resourceLikesTag(id, type);
    revalidateTag(tag);
  },
});
