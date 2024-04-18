import { auth } from '@clerk/nextjs/server';
import { resourceFts } from '@/db/ftsSchema';
import {
  category,
  comment,
  like,
  resource,
  resourceToCreator,
  resourceToTopic,
  topic,
  type,
} from '@/db/schema';
import {
  SQL,
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  inArray,
  lte,
  max,
  ne,
  or,
  sql,
} from 'drizzle-orm';
import { alias } from 'drizzle-orm/sqlite-core';
import { db } from '@/lib/db';
import 'server-only';

export const selectResources = async (
  options: {
    filter: {
      mode?: 'and' | 'or';
      id?: string[];
      type?: number[];
      category?: number[];
      topic?: number[];
      creator?: string[];
      search?: string;
      from?: Date;
      till?: Date;
      liked?: boolean;
      commented?: boolean;
      exclude?: string[];
    };
    limit?: number;
    sort?: Array<'date' | 'name' | 'likes' | 'comments' | 'random'>;
  } = { filter: {} },
) => {
  const { filter, sort, limit } = options;
  const { userId } = auth();

  const creator = alias(resource, 'creator');

  const orderBy = () => {
    if (filter.search) {
      return asc(resourceFts.rank);
    }

    if (sort && sort.length > 0) {
      return sort.map((sort) => {
        switch (sort) {
          case 'name':
            return asc(resource.name);
          case 'likes':
            return desc(likesQuery.likesCount);
          case 'comments':
            return desc(commentsQuery.commentsCount);
          case 'random':
            return sql`RANDOM()`;
          case 'date':
          default:
            return desc(resource.createdAt);
        }
      });
    }

    // Default sort
    return desc(resource.createdAt);
  };

  const likesQuery = db
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

  const commentsQuery = db
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

  const resourceIdsQuery = db
    .select({
      id: resource.id,
    })
    .from(resource)
    .leftJoin(type, eq(resource.typeId, type.id))
    .leftJoin(category, eq(resource.categoryId, category.id))
    .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
    .leftJoin(topic, eq(resourceToTopic.topicId, topic.id))
    .leftJoin(resourceToCreator, eq(resource.id, resourceToCreator.resourceId))
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

      // Collect exclude separately because it always should be and
      const exclude: Array<SQL<unknown> | undefined> = [];

      if (filter.exclude) {
        filter.exclude.forEach((id) => {
          exclude.push(ne(resource.id, id));
        });
      }

      if (filter.mode === 'or') {
        return and(or(...where), ...exclude);
      }

      return and(...where, ...exclude);
    })
    .orderBy(orderBy)
    .groupBy(resource.id)
    .limit(limit ? limit + 1 : 0);

  return await db
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
    .leftJoin(resourceToCreator, eq(resource.id, resourceToCreator.resourceId))
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
    .orderBy(orderBy)
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

      return {
        resources: limit ? resources.slice(0, limit) : resources,
        hasMore: limit ? resources.length > limit : false,
      };
    });
};

export const selectThoughtleaders = async () => {
  return await db
    .select({
      id: resource.id,
      name: resource.name,
    })
    .from(resource)
    .leftJoin(type, eq(resource.typeId, type.id))
    .where(eq(type.name, 'Thoughtleader'));
};
