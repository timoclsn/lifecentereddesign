import { createQuery } from '@/data/clients';
import 'server-only';
import { selectCategories } from './categories';

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export const getCategories = createQuery({
  cache: {
    keyParts: ['categories'],
    options: {
      tags: ['categories'],
    },
  },
  query: async () => {
    return await selectCategories();
  },
});
