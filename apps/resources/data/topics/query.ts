import { createQuery } from 'data/clients';
import { Prisma } from 'database';
import 'server-only';

export type Topic = Prisma.TopicGetPayload<{}>;
export type Topics = Array<Topic>;

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
