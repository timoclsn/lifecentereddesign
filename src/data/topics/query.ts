import { createQuery } from '@/data/clients';
import 'server-only';
import { cacheTags } from '../tags';
import { selectTopics } from './topics';

export type Topics = Awaited<ReturnType<typeof getTopics>>;

export const getTopics = createQuery({
  cache: {
    keyParts: [cacheTags.topics],
    options: {
      tags: [cacheTags.topics],
    },
  },
  query: async () => {
    return await selectTopics();
  },
});
