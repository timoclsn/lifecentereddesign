import { createQuery } from 'data/clients';
import { Prisma } from 'database';
import 'server-only';

export type Category = Prisma.CategoryGetPayload<{}>;
export type Categories = Array<Category>;

export const getCategories = createQuery({
  cache: {
    keyParts: ['categories'],
    options: {
      revalidate: 60,
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
