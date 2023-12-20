import { createQuery } from 'data/clients';
import { getResource } from 'data/resources/query';
import { ContentType, resourceTypes } from 'lib/resources';
import { withUser, withUserCollection } from 'lib/users';
import 'server-only';
import { z } from 'zod';

export const getCollections = createQuery({
  cache: {
    keyParts: ['collections'],
    options: {
      revalidate: 60,
      tags: ['collections'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    const collections = await db.collection.findMany();
    return withUserCollection(collections);
  },
});

export const resourceCollectionsTag = (resourceId: number, type: ContentType) =>
  `resource-collections-${resourceId}-${type}`;

export const getResourceCollections = createQuery({
  input: z.object({
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { resourceId, resourceType } = input;
    const tag = resourceCollectionsTag(resourceId, resourceType);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { db } = ctx;
    const { resourceId, resourceType } = input;

    const collectionItems = await db.collectionItem.findMany({
      where: {
        resourceId,
        resourceType,
      },
      include: {
        collection: true,
      },
    });

    return collectionItems.map((collectionItem) => collectionItem.collection);
  },
});

export const collectionTag = (id: number) => `collection-${id}`;

export const getCollection = createQuery({
  input: z.object({
    id: z.number(),
  }),
  cache: ({ input }) => {
    const { id } = input;
    const tag = collectionTag(id);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { db } = ctx;
    const { id } = input;

    const collection = await db.collection.findUnique({
      where: {
        id,
      },
      include: {
        collectionItem: true,
      },
    });

    if (!collection) return null;

    const collectionWithUser = await withUser(collection);

    // Resolve collectionItems
    const resourcesPromises = collectionWithUser.collectionItem.map(
      ({ resourceId, resourceType }) =>
        getResource({
          id: resourceId,
          type: resourceType,
        }),
    );
    const resources = await Promise.all(resourcesPromises);

    return {
      ...collectionWithUser,
      collectionItem: undefined,
      resources,
    };
  },
});

export const getCollectionItem = createQuery({
  input: z.object({
    collectionId: z.number(),
    resourceId: z.number(),
    resourceType: z.enum(resourceTypes),
  }),
  query: async ({ input, ctx }) => {
    const { db } = ctx;
    const { collectionId, resourceId, resourceType } = input;

    return await db.collectionItem.findUnique({
      where: {
        collectionId_resourceId_resourceType: {
          collectionId,
          resourceId,
          resourceType,
        },
      },
    });
  },
});
