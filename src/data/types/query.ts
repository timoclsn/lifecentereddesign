import { createQuery } from '@/data/clients';
import 'server-only';
import { getTag } from '../tags';
import { selectTypes } from './types';

export type Types = Awaited<ReturnType<typeof getTypes>>;

export const getTypes = createQuery({
  cache: {
    keyParts: [getTag('types')],
    options: {
      tags: [getTag('types')],
    },
  },
  query: async () => {
    return await selectTypes();
  },
});
