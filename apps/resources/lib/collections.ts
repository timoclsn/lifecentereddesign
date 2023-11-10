import { prisma } from 'database';
import { ContentType, getResource } from './resources';
import { withUser, withUserCollection } from './users';

export const getCollections = async () => {
  const collections = await prisma.collection.findMany();
  return withUserCollection(collections);
};

export const getResourceCollections = async (
  resourceId: number,
  resourceType: ContentType,
) => {
  const collectionItems = await prisma.collectionItem.findMany({
    where: {
      resourceId,
      resourceType,
    },
    include: {
      collection: true,
    },
  });

  return collectionItems.map((collectionItem) => collectionItem.collection);
};

export const getCollection = async (id: number) => {
  const collection = await prisma.collection.findUnique({
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
    ({ resourceId, resourceType }) => getResource(resourceId, resourceType),
  );
  const resources = await Promise.all(resourcesPromises);

  return {
    ...collectionWithUser,
    collectionItem: undefined,
    resources,
  };
};

export const createCollection = async (data: {
  userId: string;
  title: string;
  description: string;
}) => {
  return prisma.collection.create({
    data,
  });
};

export const updateCollection = async (
  id: number,
  data: {
    title: string;
    description: string;
  },
) => {
  await prisma.collection.update({
    where: {
      id,
    },
    data,
  });
};

export const removeCollection = async (id: number) => {
  await prisma.collectionItem.deleteMany({
    where: {
      collectionId: id,
    },
  });

  await prisma.collection.delete({
    where: {
      id,
    },
  });
};

export const addCollectionItem = async (
  collectionId: number,
  resourceId: number,
  resourceType: ContentType,
) => {
  await prisma.collectionItem.create({
    data: {
      collectionId,
      resourceId,
      resourceType,
    },
  });
};

export const getCollectionItem = (
  collectionId: number,
  resourceId: number,
  resourceType: ContentType,
) => {
  return prisma.collectionItem.findUnique({
    where: {
      collectionId_resourceId_resourceType: {
        collectionId,
        resourceId,
        resourceType,
      },
    },
  });
};

export const removeCollectionItem = async (
  collectionId: number,
  resourceId: number,
  resourceType: ContentType,
) => {
  await prisma.collectionItem.delete({
    where: {
      collectionId_resourceId_resourceType: {
        collectionId,
        resourceId,
        resourceType,
      },
    },
  });
};
