'use server';

import { createProtectedAction } from 'lib/serverActions/create';
import { collectionTag, resourceCollectionsTag } from 'lib/cache';
import {
  addCollectionItem,
  getCollection,
  removeCollectionItem,
} from 'lib/collections';
import { resourceTypes } from 'lib/resources';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const addToCollection = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { userId } = ctx;

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only add to your own collections');
    }

    await addCollectionItem(collectionId, resourceId, resourceType);

    revalidateTag(resourceCollectionsTag(resourceId, resourceType));
    revalidateTag(collectionTag(collectionId));
  },
});

export const removeFromCollection = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { userId } = ctx;

    const collection = await getCollection(collectionId);

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only remove from your own collections');
    }

    await removeCollectionItem(collectionId, resourceId, resourceType);

    revalidateTag(resourceCollectionsTag(resourceId, resourceType));
    revalidateTag(collectionTag(collectionId));
  },
});
