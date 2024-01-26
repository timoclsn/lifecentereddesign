import { auth } from '@clerk/nextjs';
import * as cheerio from 'cheerio';
import { createQuery } from 'data/clients';
import { ContentType, Resource, includes, resourceTypes } from 'lib/resources';
import { withUserCollection } from 'lib/users';
import { isUrl, wait } from 'lib/utils/utils';
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

    const [likes, comments, ...resources] = await Promise.all([
      db.like.findMany({
        select: {
          resourceId: true,
          type: true,
        },
      }),
      db.comment.findMany({
        select: {
          resourceId: true,
          type: true,
        },
      }),
      ...resourcePromises,
    ]);

    const enhancedResources = resources.flat().map((resource) => {
      const newLikesCount = likes.filter(
        (like) =>
          like.resourceId === resource.id && like.type === resource.type,
      ).length;

      const commentsCount = comments.filter(
        (comment) =>
          comment.resourceId === resource.id && comment.type === resource.type,
      ).length;

      return {
        ...resource,
        likes: resource.likes + newLikesCount,
        comments: commentsCount,
      };
    });

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
    const { id, type } = input;
    const { db } = ctx;

    const [resource, newLikesCount] = await Promise.all([
      // @ts-expect-error: Dynamic table access doesn't work on type level
      db[type].findUnique({
        where: {
          id: id,
        },
        include: {
          ...includes(type),
        },
      }) as Promise<Resource>,
      db.like.count({
        where: {
          resourceId: id,
          type,
        },
      }),
    ]);

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
  query: async ({ input, ctx }) => {
    const { id, type } = input;
    const { db } = ctx;

    const [oldLikes, newLikes] = await Promise.all([
      // prettier-ignore
      // @ts-expect-error: Dynamic table access doesn't work on type level
      db[type].findUnique({
          where: {
            id: id,
          },
          select: {
            likes: true,
          },
        }) as { likes: number },
      db.like.findMany({
        where: {
          resourceId: id,
          type,
        },
      }),
    ]);

    return {
      oldLikesCount: oldLikes.likes,
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
      keyParts: [`commentscount-${type}-${id}`],
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

export const getOgImageLink = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
    url: z.string().url(),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = `resource-og-image-${type}-${id}`;
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input }) => {
    const { url } = input;

    const response = await fetch(url);
    const data = await response.text();

    const $ = cheerio.load(data);
    const ogImageUrl = $('meta[property="og:image"]').attr('content') || '';

    return isUrl(ogImageUrl) ? ogImageUrl : '';
  },
});

export const getResourcesCount = createQuery({
  cache: {
    keyParts: ['resources-count'],
    options: {
      revalidate: 60,
      tags: ['resources-count'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    await wait(2000);

    const counts = (await Promise.all(
      resourceTypes.map((type) => {
        // @ts-expect-error: Dynamic table access doesn't work on type level
        return db[type].count();
      }),
    )) as Array<number>;

    return counts.reduce((acc, curr) => acc + curr, 0);
  },
});
