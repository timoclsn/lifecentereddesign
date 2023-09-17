'use server';

import { addCollectionSchema } from 'components/AddCollectionDialog/schemas';
import { createAction } from 'lib/actions/createAction';
import {
  getCollection,
  updateCollection as dbUpdateCollection,
} from 'lib/collections';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const updateCollection = createAction({
  input: addCollectionSchema.merge(
    z.object({
      collectionId: z.number(),
    }),
  ),
  action: async ({ ctx, input }) => {
    const { collectionId, title, description } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

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
