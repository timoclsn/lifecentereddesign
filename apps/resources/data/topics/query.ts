import { createQuery } from 'data/clients';
import 'server-only';
import { db as dbNew } from 'lib/db';
import { asc } from 'drizzle-orm';
import { topic } from 'db/schema';

export type Topics = Awaited<ReturnType<typeof getTopics>>;

export const getTopics = createQuery({
  cache: {
    keyParts: ['topics'],
    options: {
      revalidate: 3600,
      tags: ['topics'],
    },
  },
  query: async () => {
    return await dbNew.query.topic.findMany({
      orderBy: asc(topic.name),
    });
  },
});
