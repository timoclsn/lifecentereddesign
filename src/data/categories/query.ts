import { createQuery } from '@/data/clients';
import 'server-only';
import { cacheTags } from '../tags';
import { selectCategories } from './categories';

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export const getCategories = createQuery({
  cache: {
    keyParts: [cacheTags.categories],
    options: {
      tags: [cacheTags.categories],
    },
  },
  query: async () => {
    return await selectCategories();
  },
});
