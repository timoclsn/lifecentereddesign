'use server';

import { createAction } from 'lib/actions/createAction';
import {
  addCollectionItem,
  getCollection,
  removeCollectionItem,
} from 'lib/collections';
import { resourceTypes } from 'lib/resources';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addToCollection = createAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only add to your own collections');
    }

    await addCollectionItem(collectionId, resourceId, resourceType);
    revalidatePath('/');
  },
});

export const removeFromCollection = createAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { userId } = ctx;

    if (!userId) {
      throw new Error('Unauthorized');
    }

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only remove from your own collections');
    }

    await removeCollectionItem(collectionId, resourceId, resourceType);
    revalidatePath('/');
  },
});
