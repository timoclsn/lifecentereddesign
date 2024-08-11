import { resourceFts } from '@/db/ftsSchema';
import {
  category,
  comment,
  like as likeSchema,
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
  like,
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
      ids?: number[];
      slugs?: string[];
      typeIds?: number[];
      typeNames?: string[];
      categoryIds?: number[];
      categoryNames?: string[];
      topicIds?: number[];
      topicNames?: string[];
      relatedResourceIds?: number[];
      search?: string;
      from?: Date;
      till?: Date;
      liked?: boolean;
      commented?: boolean;
      excludeIds?: number[];
    };
    limit?: number;
    sort?: Array<'date' | 'name' | 'likes' | 'comments' | 'random'>;
  } = {
    userId: '',
    filter: {},
  },
) => {
  const { userId, filter, sort, limit } = options;

  // Replace dashes with spaces because in FTS5 dashes ares special characters
  const searchTerm = filter.search ? filter.search.replace(/-/g, ' ') : '';

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
      resourceId: likeSchema.resourceId,
      likesCount: count(likeSchema.resourceId).as('likesCount'),
      likedByUser: (userId
        ? max(eq(likeSchema.userId, userId))
        : sql<number>`0`
      )
        .mapWith(Boolean)
        .as('likedByUser'),
    })
    .from(likeSchema)
    .groupBy(likeSchema.resourceId)
    .as('likesQuery');

  const commentsQuery = db
    .select({
      resourceId: comment.resourceId,
      commentsCount: count(comment.resourceId).as('commentsCount'),
      commentedByUser: (userId
        ? max(eq(comment.userId, userId))
        : sql<number>`0`
      )
        .mapWith(Boolean)
        .as('commentedByUser'),
    })
    .from(comment)
    .groupBy(comment.resourceId)
    .as('commentsQuery');

  // Build up resource id query
  const resourceIdsQuery = db
    .select({
      id: resource.id,
    })
    .from(resource);

  if (filter.typeIds || filter.typeNames) {
    resourceIdsQuery.leftJoin(type, eq(resource.typeId, type.id));
  }

  if (filter.categoryIds || filter.categoryNames) {
    resourceIdsQuery.leftJoin(category, eq(resource.categoryId, category.id));
  }

  if (filter.topicIds || filter.topicNames) {
    resourceIdsQuery
      .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
      .leftJoin(topic, eq(resourceToTopic.topicId, topic.id));
  }

  if (filter.relatedResourceIds) {
    resourceIdsQuery
      .leftJoin(
        resourceToRelatedResource,
        eq(resource.id, resourceToRelatedResource.resourceId),
      )
      .leftJoin(
        relatedResource,
        eq(resourceToRelatedResource.relatedResourceId, relatedResource.id),
      );
  }

  if (filter.liked || sort?.includes('likes')) {
    resourceIdsQuery.leftJoin(
      likesQuery,
      eq(resource.id, likesQuery.resourceId),
    );
  }

  if (filter.commented || sort?.includes('comments')) {
    resourceIdsQuery.leftJoin(
      commentsQuery,
      eq(resource.id, commentsQuery.resourceId),
    );
  }

  if (filter.search) {
    resourceIdsQuery.innerJoin(resourceFts, eq(resourceFts.id, resource.id));
  }

  resourceIdsQuery.where(() => {
    const where: Array<SQL<unknown> | undefined> = [];

    // Search
    if (filter.search) {
      where.push(sql`${resourceFts} MATCH ${searchTerm}`);
    }

    // Filters
    if (filter.ids) {
      filter.ids.forEach((id) => {
        where.push(eq(resource.id, id));
      });
    }

    if (filter.slugs) {
      filter.slugs.forEach((slug) => {
        where.push(eq(resource.slug, slug));
      });
    }

    if (filter.typeIds) {
      filter.typeIds.forEach((typeId) => {
        where.push(eq(type.id, typeId));
      });
    }

    if (filter.typeNames) {
      filter.typeNames.forEach((typeName) => {
        where.push(like(type.name, typeName));
      });
    }

    if (filter.categoryIds) {
      filter.categoryIds.forEach((categoryId) => {
        where.push(eq(category.id, categoryId));
      });
    }

    if (filter.categoryNames) {
      filter.categoryNames.forEach((categoryName) => {
        where.push(like(category.name, categoryName));
      });
    }

    if (filter.topicIds) {
      filter.topicIds.forEach((topicId) => {
        where.push(eq(topic.id, topicId));
      });
    }

    if (filter.topicNames) {
      filter.topicNames.forEach((topicName) => {
        where.push(like(topic.name, topicName));
      });
    }

    if (filter.relatedResourceIds) {
      filter.relatedResourceIds.forEach((relatedResourceId) => {
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

    if (filter.excludeIds) {
      filter.excludeIds.forEach((id) => {
        exclude.push(ne(resource.id, id));
      });
    }

    if (filter.mode === 'or') {
      return and(or(...where), ...exclude);
    }

    return and(...where, ...exclude);
  });

  resourceIdsQuery.orderBy(orderBy);
  resourceIdsQuery.groupBy(resource.id);

  if (limit) {
    resourceIdsQuery.limit(limit + 1);
  }

  // Build up resource query
  const resourcesQuery = db
    .select({
      id: resource.id,
      name: resource.name,
      slug: resource.slug,
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
      relatedResource: {
        id: relatedResource.id,
        slug: relatedResource.slug,
        name: relatedResource.name,
        type: relatedResource.typeId,
      },
      likesCount: sql<number>`coalesce(${likesQuery.likesCount}, 0) + ${resource.anonymousLikesCount}`,
      likedByUser: likesQuery.likedByUser,
      commentsCount: sql<number>`coalesce(${commentsQuery.commentsCount}, 0)`,
      commentedByUser: commentsQuery.commentedByUser,
    })
    .from(resource);

  resourcesQuery
    .leftJoin(type, eq(resource.typeId, type.id))
    .leftJoin(category, eq(resource.categoryId, category.id))
    .leftJoin(resourceToTopic, eq(resource.id, resourceToTopic.resourceId))
    .leftJoin(topic, eq(resourceToTopic.topicId, topic.id))
    .leftJoin(
      resourceToRelatedResource,
      eq(resource.id, resourceToRelatedResource.resourceId),
    )
    .leftJoin(
      relatedResource,
      eq(resourceToRelatedResource.relatedResourceId, relatedResource.id),
    )
    .leftJoin(likesQuery, eq(resource.id, likesQuery.resourceId))
    .leftJoin(commentsQuery, eq(resource.id, commentsQuery.resourceId));

  if (filter.search) {
    resourcesQuery.innerJoin(resourceFts, eq(resourceFts.id, resource.id));
  }

  resourcesQuery.where(() => {
    const where: Array<SQL<unknown> | undefined> = [
      inArray(resource.id, resourceIdsQuery),
    ];

    // Search
    if (filter.search) {
      where.push(sql`${resourceFts} MATCH ${searchTerm}`);
    }

    return and(...where);
  });

  resourcesQuery.orderBy(orderBy);

  // Execute resource query
  return await resourcesQuery.execute().then((result) => {
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
          if (!resource.topics.some((topic) => topic.id === row.topic?.id))
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
