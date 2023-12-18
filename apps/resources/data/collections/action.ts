'use server';

import { createProtectedAction } from 'data/clients';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import 'server-only';
import { z } from 'zod';
import { getCollection } from './query';
import { resourceTypes } from 'data/resources/query';
import { collectionTag, resourceCollectionsTag } from 'lib/cache';

const addCollectionSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'The collection title has to be 3 characters minimum.',
    })
    .max(50, {
      message: 'The collection title cannot be longer than 50 characters.',
    }),
  description: z
    .string()
    .min(3, {
      message: 'The collection description has to be 3 characters minimum.',
    })
    .max(300, {
      message:
        'The collection description cannot be longer than 300 characters.',
    }),
});

export const addCollection = createProtectedAction({
  input: addCollectionSchema.merge(
    z.object({
      goToCollection: z.boolean().optional(),
    }),
  ),
  action: async ({ input, ctx }) => {
    const { title, description, goToCollection } = input;
    const { db, userId } = ctx;

    const collection = await db.collection.create({
      data: {
        userId,
        title,
        description,
      },
    });

    revalidateTag('collections');

    if (goToCollection) {
      redirect(`/collections/${collection.id}`);
    }
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
    const { db, userId } = ctx;

    const collection = await getCollection({ id: collectionId });

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only update your own collections');
    }

    await db.collection.update({
      where: {
        id: collectionId,
      },
      data: {
        title,
        description,
      },
    });

    revalidateTag('collections');
    revalidateTag(`collection-${collectionId}`);
  },
});

export const deleteCollection = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId } = input;
    const { db, userId } = ctx;

    const collection = await getCollection({ id: collectionId });

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await db.collection.delete({
      where: {
        id: collectionId,
      },
    });

    revalidateTag('collections');
    redirect('/collections');
  },
});

export const addCollectionItem = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { db, userId } = ctx;

    const collection = await getCollection({ id: collectionId });

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only add to your own collections');
    }

    await db.collectionItem.create({
      data: {
        collectionId,
        resourceId,
        resourceType,
      },
    });

    revalidateTag(resourceCollectionsTag(resourceId, resourceType));
    revalidateTag(collectionTag(collectionId));
  },
});

export const removeCollectionItem = createProtectedAction({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  action: async ({ input, ctx }) => {
    const { collectionId, resourceId, resourceType } = input;
    const { db, userId } = ctx;

    const collection = await getCollection({ id: collectionId });

    if (!collection) {
      throw new Error('Collection not found');
    }

    if (collection.userId !== userId) {
      throw new Error('You can only remove from your own collections');
    }

    await db.collectionItem.delete({
      where: {
        collectionId_resourceId_resourceType: {
          collectionId,
          resourceId,
          resourceType,
        },
      },
    });

    revalidateTag(resourceCollectionsTag(resourceId, resourceType));
    revalidateTag(collectionTag(collectionId));
  },
});
