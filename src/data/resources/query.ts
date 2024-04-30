import { createQuery } from '@/data/clients';
import { selectResources } from '@/data/resources/resources';
import { comment, like, resource } from '@/db/schema';
import { withUserCollection } from '@/lib/users';
import { isUrl, wait } from '@/lib/utils/utils';
import * as cheerio from 'cheerio';
import { count, countDistinct, desc, eq } from 'drizzle-orm';
import 'server-only';
import { z } from 'zod';
import { getTag } from '../tags';

type GetResourcesResult = Awaited<ReturnType<typeof getResources>>;
export type Resources = GetResourcesResult['resources'];
export type Resource = Resources[number];
export type RelatedResources = Resource['relatedResources'];
export type Creator = RelatedResources[number];
export type Topics = Resource['topics'];
export type Topic = Topics[number];

export const getResources = createQuery({
  input: z.object({
    limit: z.number().optional(),
    sort: z
      .array(z.enum(['date', 'name', 'likes', 'comments', 'random']))
      .optional(),
    filter: z
      .object({
        mode: z.enum(['and', 'or']).optional(),
        id: z.array(z.number()).optional(),
        type: z.array(z.string()).optional(),
        category: z.array(z.string()).optional(),
        topic: z.array(z.string()).optional(),
        relatedResource: z.array(z.number()).optional(),
        search: z.string().optional().optional(),
        from: z.date().optional(),
        till: z.date().optional(),
        liked: z.boolean().optional(),
        commented: z.boolean().optional(),
        exclude: z.array(z.number()).optional(),
      })
      .optional()
      .default({}),
  }),
  cache: ({ input, ctx }) => {
    const { userId } = ctx;

    const cacheKeyArray = Object.entries({
      userId,
      limit: input.limit,
      sort: input.sort,
      ...input.filter,
    }).sort((a, b) => a[0].localeCompare(b[0]));

    return {
      keyParts: [JSON.stringify(cacheKeyArray)],
      options: {
        tags: [getTag('resources')],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { userId } = ctx;

    return await selectResources({
      userId,
      ...input,
    });
  },
});

export const getResourceBySlug = createQuery({
  input: z.object({
    slug: z.string(),
  }),
  cache: ({ input }) => {
    const { slug } = input;
    const key = `resource-${slug}`;
    return {
      keyParts: [key],
      options: {
        tags: [getTag('resources')],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { slug } = input;
    const { userId } = ctx;

    const { resources } = await selectResources({
      userId,
      filter: {
        slug: [slug],
      },
    });

    const resource = resources[0];

    if (!resource) {
      throw new Error('Resource not found');
    }

    return resource;
  },
});

export const getLikedResourcesCount = createQuery({
  cache: ({ ctx }) => {
    const { userId } = ctx;
    const tag = getTag('likedResourcesCount', userId || '');

    return {
      keyParts: [tag],
      options: {
        tags: [tag],
      },
    };
  },
  query: async ({ ctx }) => {
    const { userId, db } = ctx;

    if (!userId) {
      return 0;
    }

    const [result] = await db
      .select({ count: count() })
      .from(like)
      .where(eq(like.userId, userId));

    return result.count;
  },
});

export const getResourceComments = createQuery({
  input: z.object({
    id: z.number(),
  }),
  cache: ({ input }) => {
    const { id } = input;
    const tag = getTag('resourceComments', id);
    return {
      keyParts: [tag],
      options: {
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { id } = input;
    const { db } = ctx;

    const comments = await db.query.comment.findMany({
      where: eq(comment.resourceId, id),
      orderBy: desc(comment.createdAt),
    });

    return withUserCollection(comments);
  },
});

export const getCommentedResourcesCount = createQuery({
  cache: ({ ctx }) => {
    const { userId } = ctx;
    const tag = getTag('commentedResourcesCount', userId || '');

    return {
      keyParts: [tag],
      options: {
        tags: [tag],
      },
    };
  },
  query: async ({ ctx }) => {
    const { userId, db } = ctx;

    if (!userId) {
      return 0;
    }

    const [result] = await db
      .select({ count: countDistinct(comment.resourceId) })
      .from(comment)
      .where(eq(comment.userId, userId));

    return result.count;
  },
});

export const getOgImageLink = createQuery({
  input: z.object({
    id: z.number(),
    url: z.string().url(),
  }),
  cache: ({ input }) => {
    const { id } = input;
    const tag = getTag('ogImageLink', id);
    return {
      keyParts: [tag],
      options: {
        revalidate: 3600,
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
    keyParts: [getTag('resourcesCount')],
    options: {
      tags: [getTag('resourcesCount')],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;

    await wait(2000);

    const [result] = await db
      .select({
        count: count(),
      })
      .from(resource);

    return result.count;
  },
});

export const getRecommendedResourcesBySlug = createQuery({
  input: z.object({
    slug: z.string(),
  }),
  cache: ({ input, ctx }) => {
    const { slug } = input;
    const { userId } = ctx;
    const key = `recommended-resources-${slug}-${userId}`;
    return {
      keyParts: [key],
      options: {
        tags: [getTag('resources')],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { slug } = input;
    const { userId } = ctx;

    const recommendedResources: Resources = [];

    const { resources } = await selectResources({
      userId,
      filter: {
        slug: [slug],
      },
    });

    const resource = resources[0];

    if (!resource) {
      throw new Error('Resource not found');
    }

    if (resource.type?.name === 'Thoughtleader') {
      const { resources } = await selectResources({
        userId,
        limit: 10,
        sort: ['likes', 'comments', 'date'],
        filter: {
          relatedResource: [resource.id],
        },
      });

      recommendedResources.push(...resources);
    } else {
      const relatedResourceIds = resource.relatedResources.map(
        (relatedResource) => relatedResource.id,
      );

      const relatedTopicIds = resource.topics.map((topic) => topic.name);

      const { resources } = await selectResources({
        userId,
        limit: 10,
        sort: ['likes', 'comments', 'date'],
        filter: {
          mode: 'or',
          relatedResource: relatedResourceIds,
          topic: relatedTopicIds,
          exclude: [resource.id],
        },
      });

      recommendedResources.push(...resources);
    }

    // If we don't have enough related resources, we'll fetch some more
    if (recommendedResources.length < 10) {
      const { resources } = await selectResources({
        userId,
        limit: 10 - recommendedResources.length,
        sort: ['likes', 'comments', 'random'],
        filter: {
          exclude: [resource.id, ...recommendedResources.map(({ id }) => id)],
        },
      });

      recommendedResources.push(...resources);
    }

    return recommendedResources;
  },
});
