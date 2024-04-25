import { createQuery } from '@/data/clients';
import 'server-only';
import { getTag } from '../tags';
import { selectCategories } from './categories';

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export const getCategories = createQuery({
  cache: {
    keyParts: [getTag('categories')],
    options: {
      tags: [getTag('categories')],
    },
  },
  query: async () => {
    return await selectCategories();
  },
});
