import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const resourceFts = sqliteTable('resource_fts', {
  rank: real('rank').notNull(),
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).notNull(),
  description: text('description', { mode: 'text' }),
  details: text('details', { mode: 'text' }),
  creatorNames: text('creator_names', { mode: 'text' }),
  creatorDescriptions: text('creator_descriptions', { mode: 'text' }),
  creatorDetails: text('creator_details', { mode: 'text' }),
});
