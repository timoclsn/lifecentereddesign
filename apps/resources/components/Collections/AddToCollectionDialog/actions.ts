'use server';

import {
  collectionTag,
  getCollectionsCached,
  getResourceCollectionsCached,
  resourceCollectionsTag,
} from 'lib/cache';
import {
  addCollectionItem,
  getCollection,
  removeCollectionItem,
} from 'lib/collections';
import { resourceTypes } from 'lib/resources';
import { createProtectedAction } from 'lib/serverActions/create';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const getData = createProtectedAction({
  input: z.object({
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { resourceId, resourceType } = input;
    const { userId } = ctx;

    const collections = await getCollectionsCached();
    const resourceCollections = await getResourceCollectionsCached(
      resourceId,
      resourceType,
    );
    const userCollections = collections.filter(
      (collection) => collection.userId === userId,
    );

    return userCollections.map((collection) => {
      const state = resourceCollections.find((rc) => rc.id === collection.id);
      return {
        id: collection.id,
        title: collection.title,
        checked: !!state,
      };
    });
  },
});

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
