import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  unique,
} from 'drizzle-orm/sqlite-core';

// Resource table

export const resource = sqliteTable(
  'resource',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    name: text('name', { mode: 'text', length: 256 }).notNull(),
    slug: text('slug', { mode: 'text', length: 256 }).unique().notNull(),
    suggestion: integer('suggestion', { mode: 'boolean' })
      .notNull()
      .default(false),
    link: text('link', { mode: 'text', length: 256 }).notNull(),
    typeId: integer('type_id', { mode: 'number' })
      .notNull()
      .references(() => type.id),
    categoryId: integer('category_id', { mode: 'number' })
      .notNull()
      .references(() => category.id),
    shortDescription: text('short_description', { mode: 'text' }),
    description: text('description', { mode: 'text' }),
    details: text('details', { mode: 'text' }),
    note: text('note', { mode: 'text' }),
    date: integer('date', { mode: 'timestamp' }),
    datePlain: text('date_plain', { mode: 'text', length: 256 }),
    relatedResourcesPlain: text('related_resources_plain', {
      mode: 'text',
      length: 256,
    }),
    anonymousLikesCount: integer('anonymous_likes_count', { mode: 'number' })
      .notNull()
      .default(0),
    oldSlug: text('old_slug', { mode: 'text', length: 256 }),
  },
  (table) => ({
    createdAtIdx: index('created_at_idx').on(table.createdAt),
    nameIdx: index('name_idx').on(table.name),
    typeIdx: index('type_idx').on(table.typeId),
    categoryIdx: index('category_idx').on(table.categoryId),
    anonymousLikesCountIdx: index('anonymous_likes_count_idx').on(
      table.anonymousLikesCount,
    ),
  }),
);

export const resourceRelations = relations(resource, ({ one, many }) => ({
  type: one(type, {
    fields: [resource.typeId],
    references: [type.id],
  }),
  category: one(category, {
    fields: [resource.categoryId],
    references: [category.id],
  }),
  topics: many(resourceToTopic),
  relatedResources: many(resourceToRelatedResource, {
    relationName: 'related_resource',
  }),
  likes: many(like),
}));

// Resource to relatedResource table (self referenceing many-to-many relation)

export const resourceToRelatedResource = sqliteTable(
  'resource_to_related_resource',
  {
    resourceId: integer('resource_id', { mode: 'number' })
      .notNull()
      .references(() => resource.id),
    relatedResourceId: integer('related_resource_id', { mode: 'number' })
      .notNull()
      .references(() => resource.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resourceId, table.relatedResourceId] }),
  }),
);

export const resourceToRelatedResourceRelations = relations(
  resourceToRelatedResource,
  ({ one }) => ({
    relatedResource: one(resource, {
      relationName: 'resource',
      fields: [resourceToRelatedResource.relatedResourceId],
      references: [resource.id],
    }),
    resource: one(resource, {
      relationName: 'related_resource',
      fields: [resourceToRelatedResource.resourceId],
      references: [resource.id],
    }),
  }),
);

// Type table

export const type = sqliteTable('type', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const typeRelations = relations(type, ({ many }) => ({
  resource: many(resource),
}));

// Category table

export const category = sqliteTable('category', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const categoryRelations = relations(category, ({ many }) => ({
  resource: many(resource),
}));

// Topic table

export const topic = sqliteTable('topic', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const topicRelations = relations(topic, ({ many }) => ({
  resourceToTopic: many(resourceToTopic),
}));

// Resource to topic table

export const resourceToTopic = sqliteTable(
  'resource_to_topic',
  {
    resourceId: integer('resource_id', { mode: 'number' })
      .notNull()
      .references(() => resource.id),
    topicId: integer('topic_id', { mode: 'number' })
      .notNull()
      .references(() => topic.id),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.resourceId, table.topicId] }),
  }),
);

export const resourceToTopicRelations = relations(
  resourceToTopic,
  ({ one }) => ({
    resource: one(resource, {
      fields: [resourceToTopic.resourceId],
      references: [resource.id],
    }),
    topic: one(topic, {
      fields: [resourceToTopic.topicId],
      references: [topic.id],
    }),
  }),
);

// Like table

export const like = sqliteTable(
  'like',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    userId: text('user_id', { mode: 'text', length: 256 }).notNull(),
    resourceId: integer('resource_id', { mode: 'number' })
      .notNull()
      .references(() => resource.id),
  },
  (table) => ({
    unique: unique().on(table.resourceId, table.userId),
  }),
);

export const likeRelations = relations(like, ({ one }) => ({
  resource: one(resource, {
    fields: [like.resourceId],
    references: [resource.id],
  }),
}));

// Comment table

export const comment = sqliteTable(
  'comment',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    userId: text('user_id', { mode: 'text', length: 256 }).notNull(),
    resourceId: integer('resource_id', { mode: 'number' })
      .notNull()
      .references(() => resource.id),
    text: text('text', { mode: 'text' }).notNull(),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
    resourceIdx: index('resource_idx').on(table.resourceId),
  }),
);

export const commentRelations = relations(comment, ({ one }) => ({
  resource: one(resource, {
    fields: [comment.resourceId],
    references: [resource.id],
  }),
}));
