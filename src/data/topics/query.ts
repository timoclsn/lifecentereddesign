import { createQuery } from '@/data/clients';
import 'server-only';
import { selectTopics } from './topics';

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
    return await selectTopics();
  },
});
