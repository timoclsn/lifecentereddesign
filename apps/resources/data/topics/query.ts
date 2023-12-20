import { createQuery } from 'data/clients';
import 'server-only';

export const getTopics = createQuery({
  cache: {
    keyParts: ['topics'],
    options: {
      revalidate: 60,
      tags: ['topics'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    return await db.topic.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  },
});
