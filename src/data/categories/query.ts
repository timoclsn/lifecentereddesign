import { createQuery } from '@/data/clients';
import 'server-only';
import { selectCategories } from './categories';

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export const getCategories = createQuery({
  cache: {
    keyParts: ['categories'],
    options: {
      revalidate: 3600,
      tags: ['categories'],
    },
  },
  query: async () => {
    return await selectCategories();
  },
});
