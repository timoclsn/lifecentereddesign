import { createQuery } from '@/data/clients';
import 'server-only';
import { getTag } from '../tags';
import { selectTopics } from './topics';

export type Topics = Awaited<ReturnType<typeof getTopics>>;

export const getTopics = createQuery({
  cache: {
    keyParts: [getTag('topics')],
    options: {
      tags: [getTag('topics')],
    },
  },
  query: async () => {
    return await selectTopics();
  },
});
