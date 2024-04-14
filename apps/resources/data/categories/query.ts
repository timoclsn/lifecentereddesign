import { createQuery } from 'data/clients';
import { category } from 'db/schema';
import { asc } from 'drizzle-orm';
import { db as dbNew } from 'lib/db';
import 'server-only';

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export const getCategories = createQuery({
  cache: {
    keyParts: ['categories'],
    options: {
      revalidate: 3600,
      tags: ['categories'],
    },
  },
  query: async () => {
    return dbNew.query.category.findMany({
      orderBy: asc(category.name),
    });
  },
});
