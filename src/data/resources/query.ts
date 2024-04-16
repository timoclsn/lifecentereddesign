import { auth } from '@clerk/nextjs/server';
import * as cheerio from 'cheerio';
import { createQuery } from '@/data/clients';
import { comment, like, resource } from '@/db/schema';
import { count, countDistinct, desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { selectResources } from '@/lib/resources';
import { withUserCollection } from '@/lib/users';
import { isUrl, wait } from '@/lib/utils/utils';
import 'server-only';
import { z } from 'zod';

type GetResourcesResult = Awaited<ReturnType<typeof getResources>>;
export type Resources = GetResourcesResult['resources'];
export type Resource = Resources[number];
export type Creators = Resource['creators'];
export type Creator = Creators[number];
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
        id: z.array(z.string()).optional(),
        type: z.array(z.number()).optional(),
        category: z.array(z.number()).optional(),
        topic: z.array(z.number()).optional(),
        creator: z.array(z.string()).optional(),
        search: z.string().optional().optional(),
        from: z.date().optional(),
        till: z.date().optional(),
        liked: z.boolean().optional(),
        commented: z.boolean().optional(),
        exclude: z.array(z.string()).optional(),
      })
      .optional()
      .default({}),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input }) => {
    return await selectResources(input);
  },
});

export const getResource = createQuery({
  input: z.object({
    id: z.string(),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input }) => {
    const { id } = input;

    const { resources } = await selectResources({
      filter: {
        id: [id],
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
  cache: {
    noStore: true,
  },
  query: async () => {
    const { userId } = auth();

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

export const resourceCommentsTag = (resourceId: string) =>
  `comments-${resourceId}`;

export const getResourceComments = createQuery({
  input: z.object({
    id: z.string(),
  }),
  cache: ({ input }) => {
    const { id } = input;
    const tag = resourceCommentsTag(id);
    return {
      keyParts: [tag],
      options: {
        revalidate: 3600,
        tags: [tag],
      },
    };
  },
  query: async ({ input }) => {
    const { id } = input;

    const comments = await db.query.comment.findMany({
      where: eq(comment.resourceId, id),
      orderBy: desc(comment.createdAt),
    });

    return withUserCollection(comments);
  },
});

export const getCommentedResourcesCount = createQuery({
  cache: {
    noStore: true,
  },
  query: async () => {
    const { userId } = auth();

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
    id: z.string(),
    url: z.string().url(),
  }),
  cache: ({ input }) => {
    const { id } = input;
    const tag = `resource-og-image-${id}`;
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
    keyParts: ['resources-count'],
    options: {
      revalidate: 3600,
      tags: ['resources-count'],
    },
  },
  query: async () => {
    await wait(2000);

    const [result] = await db
      .select({
        count: count(),
      })
      .from(resource);

    return result.count;
  },
});

export const getRelatedResources = createQuery({
  input: z.object({
    id: z.string(),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input }) => {
    const { id } = input;

    const relatedResources: Resources = [];

    const { resources } = await selectResources({
      filter: {
        id: [id],
      },
    });

    const resource = resources[0];

    if (!resource) {
      throw new Error('Resource not found');
    }

    if (resource.type?.name === 'Thoughtleader') {
      const { resources } = await selectResources({
        limit: 10,
        sort: ['likes', 'comments', 'date'],
        filter: {
          creator: [resource.id],
        },
      });

      relatedResources.push(...resources);
    } else {
      const relatedThoughtleaders = resource.creators.map(
        (creator) => creator.id,
      );

      const relatedTopics = resource.topics.map((topic) => topic.id);

      const { resources } = await selectResources({
        limit: 10,
        sort: ['likes', 'comments', 'date'],
        filter: {
          mode: 'or',
          creator: relatedThoughtleaders,
          topic: relatedTopics,
          exclude: [resource.id],
        },
      });

      relatedResources.push(...resources);
    }

    // Fallback
    if (relatedResources.length === 0) {
      const { resources } = await selectResources({
        limit: 10,
        sort: ['random'],
        filter: {
          exclude: [resource.id],
        },
      });

      relatedResources.push(...resources);
    }

    return relatedResources;
  },
});
