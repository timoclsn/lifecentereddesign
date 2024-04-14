import { auth } from '@clerk/nextjs/server';
import * as cheerio from 'cheerio';
import { createQuery } from 'data/clients';
import { resourceFts } from 'db/ftsSchema';
import {
  category,
  comment,
  like,
  resource,
  resourceToCreator,
  resourceToTopic,
  topic,
  type,
} from 'db/schema';
import {
  SQL,
  and,
  asc,
  count,
  countDistinct,
  desc,
  eq,
  gte,
  inArray,
  lte,
  max,
  sql,
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { db as dbNew } from 'lib/db';
import { withUserCollection } from 'lib/users';
import { isUrl, wait } from 'lib/utils/utils';
import 'server-only';
import { z } from 'zod';

export type NewResourcesQuery = Awaited<ReturnType<typeof getResourcesNew>>;
export type NewResources = NewResourcesQuery['resources'];
export type NewResource = NewResources[number];

export const getResourcesNew = createQuery({
  input: z.object({
    limit: z.number().optional(),
    sort: z.enum(['date', 'name', 'likes', 'comments']).optional(),
    filter: z
      .object({
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
      })
      .optional()
      .default({}),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input }) => {
    const { filter, sort, limit } = input;
    const { userId } = auth();

    const creator = alias(resource, 'creator');

    const getOrderBy = () => {
      if (filter.search) {
        return asc(resourceFts.rank);
      }

      switch (sort) {
        case 'name':
          return asc(resource.name);
        case 'likes':
          return desc(likesQuery.likesCount);
        case 'comments':
          return desc(commentsQuery.commentsCount);
        case 'date':
        default:
          return desc(resource.createdAt);
      }
    };

    const likesQuery = dbNew
      .select({
        resourceId: like.resourceId,
        likesCount: count(like.resourceId).as('likesCount'),
        likedByUser: max(eq(like.userId, userId ?? ''))
          .mapWith(Boolean)
          .as('likedByUser'),
      })
      .from(like)
      .groupBy(like.resourceId)
      .as('likesQuery');

    const commentsQuery = dbNew
      .select({
        resourceId: comment.resourceId,
        commentsCount: count(comment.resourceId).as('commentsCount'),
        commentedByUser: max(eq(comment.userId, userId ?? ''))
          .mapWith(Boolean)
          .as('commentedByUser'),
      })
      .from(comment)
      .groupBy(comment.resourceId)
      .as('commentsQuery');

    const resourceIdsQuery = dbNew
      .select({
        id: resource.id,
      })
      .from(resource)
      .leftJoin(type, eq(resource.typeId, type.id))
      .leftJoin(category, eq(resource.categoryId, category.id))
      .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
      .leftJoin(topic, eq(resourceToTopic.topicId, topic.id))
      .leftJoin(
        resourceToCreator,
        eq(resource.id, resourceToCreator.resourceId),
      )
      .leftJoin(creator, eq(resourceToCreator.creatorId, creator.id))
      .leftJoin(likesQuery, eq(resource.id, likesQuery.resourceId))
      .leftJoin(commentsQuery, eq(resource.id, commentsQuery.resourceId))
      .innerJoin(resourceFts, eq(resourceFts.id, resource.id))
      .where(() => {
        const where: Array<SQL<unknown> | undefined> = [];

        // Search
        if (filter.search) {
          where.push(sql`${resourceFts} MATCH ${filter.search}`);
        }

        // Filters
        if (filter.id) {
          filter.id.forEach((id) => {
            where.push(eq(resource.id, id));
          });
        }

        if (filter.type) {
          filter.type.forEach((typeId) => {
            where.push(eq(type.id, typeId));
          });
        }

        if (filter.category) {
          filter.category.forEach((categoryId) => {
            where.push(eq(category.id, categoryId));
          });
        }

        if (filter.topic) {
          filter.topic.forEach((topicId) => {
            where.push(eq(topic.id, topicId));
          });
        }

        if (filter.creator) {
          filter.creator.forEach((creatorId) => {
            where.push(eq(creator.id, creatorId));
          });
        }

        if (filter.from) {
          where.push(gte(resource.createdAt, filter.from));
        }

        if (filter.till) {
          where.push(lte(resource.createdAt, filter.till));
        }

        if (filter.liked) {
          where.push(eq(likesQuery.likedByUser, filter.liked));
        }

        if (filter.commented) {
          where.push(eq(commentsQuery.commentedByUser, filter.commented));
        }

        return and(...where);
      })
      .orderBy(getOrderBy)
      .groupBy(resource.id)
      .limit(limit ? limit + 1 : 0);

    return await dbNew
      .select({
        id: resource.id,
        createdAt: resource.createdAt,
        name: resource.name,
        description: resource.description,
        note: resource.note,
        details: resource.details,
        link: resource.link,
        suggestion: resource.suggestion,
        date: resource.date,
        datePlain: resource.datePlain,
        creatorsPlain: resource.creatorsPlain,
        type: {
          id: type.id,
          name: type.name,
        },
        category: {
          id: category.id,
          name: category.name,
        },
        topic: {
          id: topic.id,
          name: topic.name,
        },
        creator: {
          id: creator.id,
          name: creator.name,
          description: creator.description,
        },
        likesCount: likesQuery.likesCount,
        likedByUser: likesQuery.likedByUser,
        commentsCount: commentsQuery.commentsCount,
        commentedByUser: commentsQuery.commentedByUser,
      })
      .from(resource)
      .leftJoin(type, eq(resource.typeId, type.id))
      .leftJoin(category, eq(resource.categoryId, category.id))
      .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
      .leftJoin(topic, eq(resourceToTopic.topicId, topic.id))
      .leftJoin(
        resourceToCreator,
        eq(resource.id, resourceToCreator.resourceId),
      )
      .leftJoin(creator, eq(resourceToCreator.creatorId, creator.id))
      .innerJoin(resourceFts, eq(resourceFts.id, resource.id))
      .leftJoin(likesQuery, eq(resource.id, likesQuery.resourceId))
      .leftJoin(commentsQuery, eq(resource.id, commentsQuery.resourceId))
      .where(() => {
        const where: Array<SQL<unknown> | undefined> = [
          inArray(resource.id, resourceIdsQuery),
        ];

        // Search
        if (filter.search) {
          where.push(sql`${resourceFts} MATCH ${filter.search}`);
        }

        return and(...where);
      })
      .orderBy(getOrderBy)
      .then((result) => {
        // Aggregate resources

        type Row = (typeof result)[number];
        type Resource = ReturnType<typeof createResource>;

        const createResource = (row: Row) => {
          const { topic, creator, ...rest } = row;
          return {
            ...rest,
            topics: topic ? [topic] : [],
            creators: creator ? [creator] : [],
          };
        };

        const resources: Array<Resource> = [];

        for (const row of result) {
          const resource = resources.find((resource) => resource.id === row.id);

          if (!resource) {
            resources.push(createResource(row));
          } else {
            if (row.topic) {
              if (!resource.topics.some((topic) => topic.id === row.topic?.id))
                resource.topics.push(row.topic);
            }
            if (row.creator) {
              if (
                !resource.creators.some((topic) => topic.id === row.creator?.id)
              )
                resource.creators.push(row.creator);
            }
          }
        }

        if (limit) {
          const hasMore = resources.length > limit;
          return {
            resources: resources.slice(0, limit),
            hasMore,
          };
        }

        return {
          resources,
          hasMore: false,
        };
      });
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

    const [result] = await dbNew
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

    const comments = await dbNew.query.comment.findMany({
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

    const [result] = await dbNew
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

    const [result] = await dbNew
      .select({
        count: count(),
      })
      .from(resource);

    return result.count;
  },
});
