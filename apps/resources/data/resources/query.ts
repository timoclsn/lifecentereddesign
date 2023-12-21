import { auth } from '@clerk/nextjs';
import { createQuery } from 'data/clients';
import { prisma } from 'database';
import {
  ContentType,
  Resource,
  getNewLikesCount,
  getResourceNewLikes,
  getResourceOldLikesCount,
  includes,
  resourceTypes,
} from 'lib/resources';
import { withUserCollection } from 'lib/users';
import 'server-only';
import { z } from 'zod';

export const getResources = createQuery({
  cache: {
    keyParts: ['resources'],
    options: {
      revalidate: 60,
      tags: ['resources'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;

    const resourcePromises = resourceTypes.map((type) => {
      // @ts-expect-error: Dynamic table access doesn't work on type level
      return db[type].findMany({
        include: {
          ...includes(type),
        },
      }) as Promise<Array<Resource>>;
    });

    const resources = await Promise.all(resourcePromises);

    const enhancedResourcesPromises = resources.flat().map(async (resource) => {
      const [newLikesCount, commentsCount] = await Promise.all([
        getNewLikesCount(resource.id, resource.type),
        getCommentsCount({
          id: resource.id,
          type: resource.type,
        }),
      ]);

      return {
        ...resource,
        likes: resource.likes + newLikesCount,
        comments: commentsCount,
      };
    });

    const enhancedResources = (
      await Promise.all(enhancedResourcesPromises)
    ).flat();

    return enhancedResources;
  },
});

export const getResource = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = `resource-${type}-${id}`;
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
    const { id, type } = input;

    // @ts-expect-error: Dynamic table access doesn't work on type level
    const resource = (await db[type].findUnique({
      where: {
        id: id,
      },
      include: {
        ...includes(type),
      },
    })) as Resource;

    const newLikesCount = await getNewLikesCount(resource.id, resource.type);

    return {
      ...resource,
      likes: resource.likes + newLikesCount,
    };
  },
});

export const resourceLikesTag = (resourceId: number, type: ContentType) =>
  `likes-${type}-${resourceId}`;

export const getResourceLikesData = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceLikesTag(id, type);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input }) => {
    const { id, type } = input;

    const [oldLikesCount, newLikes] = await Promise.all([
      getResourceOldLikesCount(id, type),
      getResourceNewLikes(id, type),
    ]);
    return {
      oldLikesCount,
      newLikes,
    };
  },
});

export type LikedResources = Awaited<ReturnType<typeof getLikedResources>>;

export const getLikedResources = createQuery({
  cache: {
    noStore: true,
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    const { userId } = auth();

    if (!userId) {
      return [];
    }

    return await db.like.findMany({
      where: {
        userId,
      },
      select: {
        resourceId: true,
        type: true,
      },
    });
  },
});

export const resourceCommentsTag = (resourceId: number, type: ContentType) =>
  `comments-${type}-${resourceId}`;

export const getResourceComments = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceCommentsTag(id, type);
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
    const { id, type } = input;

    const comments = await db.comment.findMany({
      where: {
        resourceId: id,
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return withUserCollection(comments);
  },
});

export const getCommentsCount = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceCommentsTag(id, type);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { id, type } = input;
    const { db } = ctx;

    return await db.comment.count({
      where: {
        resourceId: id,
        type,
      },
    });
  },
});

export type CommentedResources = Awaited<
  ReturnType<typeof getCommentedResources>
>;

export const getCommentedResources = createQuery({
  cache: {
    noStore: true,
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    const { userId } = auth();

    if (!userId) {
      return [];
    }

    const comments = await db.comment.findMany({
      where: {
        userId,
      },
      select: {
        resourceId: true,
        type: true,
      },
    });

    // Remove duplicates
    return comments.filter(
      (comment, index, self) =>
        index ===
        self.findIndex(
          (selfComment) => selfComment.resourceId === comment.resourceId,
        ),
    );
  },
});
