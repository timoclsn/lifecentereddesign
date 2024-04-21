import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const resourceFts = sqliteTable('resource_fts', {
  rank: real('rank').notNull(),
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).notNull(),
  description: text('description', { mode: 'text' }),
  details: text('details', { mode: 'text' }),
  relatedResourceNames: text('related_resource_names', { mode: 'text' }),
  relatedResourceDescriptions: text('related_resource_descriptions', {
    mode: 'text',
  }),
  relatedResourceDetails: text('related_resource_details', { mode: 'text' }),
});
