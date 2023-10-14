'use server';

import { addCollectionSchema } from 'components/Collections/AddCollectionDialog/schemas';
import { createProtectedAction } from 'lib/serverActions/create';
import {
  updateCollection as dbUpdateCollection,
  getCollection,
} from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const getData = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
  }),
  action: async ({ input }) => {
    const { collectionId } = input;
    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    return {
      title: collection.title,
      description: collection.description,
    };
  },
});

export const updateCollection = createProtectedAction({
  input: addCollectionSchema.merge(
    z.object({
      collectionId: z.number(),
    }),
  ),
  action: async ({ ctx, input }) => {
    const { collectionId, title, description } = input;
    const { userId } = ctx;

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only update your own collections');
    }

    await dbUpdateCollection(collectionId, {
      title,
      description,
    });

    revalidateTag('collections');
    revalidateTag(`collection-${collectionId}`);
  },
});
