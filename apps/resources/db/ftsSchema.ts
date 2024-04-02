import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const resourceFts = sqliteTable('resource_fts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name', { mode: 'text', length: 256 }).notNull(),
  description: text('description', { mode: 'text' }),
  details: text('details', { mode: 'text' }),
  rank: real('rank').notNull(),
});
