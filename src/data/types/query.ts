import { createQuery } from '@/data/clients';
import 'server-only';
import { cacheTags } from '../tags';
import { selectTypes } from './types';

export type Types = Awaited<ReturnType<typeof getTypes>>;

export const getTypes = createQuery({
  cache: {
    keyParts: [cacheTags.types],
    options: {
      tags: [cacheTags.types],
    },
  },
  query: async () => {
    return await selectTypes();
  },
});
