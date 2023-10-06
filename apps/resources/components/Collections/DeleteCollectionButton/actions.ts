'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { getCollection, removeCollection } from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const deleteCollection = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId } = input;
    const { userId } = ctx;

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await removeCollection(collectionId);

    revalidateTag('collections');
    redirect('/collections');
  },
});
