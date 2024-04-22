import { createQuery } from '@/data/clients';
import 'server-only';
import { selectTypes } from './types';

export type Types = Awaited<ReturnType<typeof getTypes>>;

export const getTypes = createQuery({
  cache: {
    keyParts: ['types'],
    options: {
      tags: ['types'],
    },
  },
  query: async () => {
    return await selectTypes();
  },
});
