import { createQuery } from 'data/clients';
import { type } from 'db/schema';
import { asc } from 'drizzle-orm';
import { db } from 'lib/db';
import 'server-only';

export type Types = Awaited<ReturnType<typeof getTypes>>;

export const getTypes = createQuery({
  cache: {
    keyParts: ['types'],
    options: {
      revalidate: 3600,
      tags: ['types'],
    },
  },
  query: async () => {
    return db.query.type.findMany({
      orderBy: asc(type.name),
    });
  },
});
