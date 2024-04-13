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
import { SQL, and, asc, count, desc, eq, inArray, max, sql } from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { db as dbNew } from 'lib/db';
import { ContentType, Resource, includes, resourceTypes } from 'lib/resources';
import { withUserCollection } from 'lib/users';
import { isUrl, wait } from 'lib/utils/utils';
import 'server-only';
import { z } from 'zod';

export type NewResources = Awaited<ReturnType<typeof getResourcesNew>>;
export type NewResource = NewResources[number];

export const getResourcesNew = createQuery({
  input: z.object({
    limit: z.number().optional(),
    orderBy: z.enum(['date', 'name', 'likes', 'comments']).optional(),
    filter: z
      .object({
        id: z.array(z.string()).optional(),
        type: z.array(z.number()).optional(),
        category: z.array(z.number()).optional(),
        topic: z.array(z.number()).optional(),
        creator: z.array(z.string()).optional(),
        search: z.string().optional().optional(),
      })
      .optional()
      .default({}),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input }) => {
    const { filter, orderBy, limit } = input;
    const { userId } = auth();

    const creator = alias(resource, 'creator');

    const getOrderBy = () => {
      if (filter.search) {
        return asc(resourceFts.rank);
      }

      switch (orderBy) {
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

        return and(...where);
      })
      .orderBy(getOrderBy)
      .groupBy(resource.id)
      .limit(limit ?? 0);

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

        return resources;
      });
  },
});

export const getResources = createQuery({
  cache: {
    keyParts: ['resources'],
    options: {
      revalidate: 3600,
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
        revalidate: 3600,
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
        revalidate: 3600,
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
