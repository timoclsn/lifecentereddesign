import { createQuery } from 'data/clients';
import 'server-only';

export const getCategories = createQuery({
  cache: {
    keyParts: ['categories'],
    options: {
      revalidate: 3600,
      tags: ['categories'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;

    return await db.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  },
});
