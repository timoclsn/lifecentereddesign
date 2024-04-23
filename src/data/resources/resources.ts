import { resourceFts } from '@/db/ftsSchema';
import {
  category,
  comment,
  like,
  resource,
  resourceToRelatedResource,
  resourceToTopic,
  topic,
  type,
} from '@/db/schema';
import { db } from '@/lib/db';
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
import 'server-only';

export const selectResources = async (
  options: {
    userId: string | null;
    filter: {
      mode?: 'and' | 'or';
      id?: string[];
      type?: string[];
      category?: string[];
      topic?: string[];
      relatedResource?: string[];
      search?: string;
      from?: Date;
      till?: Date;
      liked?: boolean;
      commented?: boolean;
      exclude?: string[];
    };
    limit?: number;
    sort?: Array<'date' | 'name' | 'likes' | 'comments' | 'random'>;
  } = {
    userId: '',
    filter: {},
  },
) => {
  const { userId, filter, sort, limit } = options;

  const relatedResource = alias(resource, 'relatedResource');

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
            return desc(
              sql<number>`coalesce(${likesQuery.likesCount}, 0) + ${resource.anonymousLikesCount}`,
            );
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
    .leftJoin(type, eq(resource.typeId, type.name))
    .leftJoin(category, eq(resource.categoryId, category.name))
    .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
    .leftJoin(topic, eq(resourceToTopic.topicId, topic.name))
    .leftJoin(
      resourceToRelatedResource,
      eq(resource.id, resourceToRelatedResource.resourceId),
    )
    .leftJoin(
      relatedResource,
      eq(resourceToRelatedResource.relatedResourceId, relatedResource.id),
    )
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
          where.push(eq(type.name, typeId));
        });
      }

      if (filter.category) {
        filter.category.forEach((categoryId) => {
          where.push(eq(category.name, categoryId));
        });
      }

      if (filter.topic) {
        filter.topic.forEach((topicId) => {
          where.push(eq(topic.name, topicId));
        });
      }

      if (filter.relatedResource) {
        filter.relatedResource.forEach((relatedResourceId) => {
          where.push(eq(relatedResource.id, relatedResourceId));
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
      shortDescription: resource.shortDescription,
      description: resource.description,
      note: resource.note,
      details: resource.details,
      link: resource.link,
      suggestion: resource.suggestion,
      date: resource.date,
      datePlain: resource.datePlain,
      relatedResourcesPlain: resource.relatedResourcesPlain,
      type: {
        name: type.name,
      },
      category: {
        name: category.name,
      },
      topic: {
        name: topic.name,
      },
      relatedResource: {
        id: relatedResource.id,
        name: relatedResource.name,
        type: relatedResource.typeId,
      },
      likesCount: sql<number>`coalesce(${likesQuery.likesCount}, 0) + ${resource.anonymousLikesCount}`,
      likedByUser: likesQuery.likedByUser,
      commentsCount: sql<number>`coalesce(${commentsQuery.commentsCount}, 0)`,
      commentedByUser: commentsQuery.commentedByUser,
    })
    .from(resource)
    .leftJoin(type, eq(resource.typeId, type.name))
    .leftJoin(category, eq(resource.categoryId, category.name))
    .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
    .leftJoin(topic, eq(resourceToTopic.topicId, topic.name))
    .leftJoin(
      resourceToRelatedResource,
      eq(resource.id, resourceToRelatedResource.resourceId),
    )
    .leftJoin(
      relatedResource,
      eq(resourceToRelatedResource.relatedResourceId, relatedResource.id),
    )
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
        const { topic, relatedResource, ...rest } = row;
        return {
          ...rest,
          topics: topic ? [topic] : [],
          relatedResources: relatedResource ? [relatedResource] : [],
        };
      };

      const resources: Array<Resource> = [];

      for (const row of result) {
        const resource = resources.find((resource) => resource.id === row.id);

        if (!resource) {
          resources.push(createResource(row));
        } else {
          if (row.topic) {
            if (
              !resource.topics.some((topic) => topic.name === row.topic?.name)
            )
              resource.topics.push(row.topic);
          }
          if (row.relatedResource) {
            if (
              !resource.relatedResources.some(
                (relatedResource) =>
                  relatedResource.id === row.relatedResource?.id,
              )
            )
              resource.relatedResources.push(row.relatedResource);
          }
        }
      }

      return {
        resources: limit ? resources.slice(0, limit) : resources,
        hasMore: limit ? resources.length > limit : false,
      };
    });
};
