'use server';

import { createAction } from 'lib/actions/createAction';
import { getCollection, removeCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteCollection = createAction({
  input: z.object({
    collectionId: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await removeCollection(collectionId);
  },
  onSuccess: () => {
    revalidateTag('collections');
    redirect('/collections');
  },
});
