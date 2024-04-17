import { createQuery } from '@/data/clients';
import 'server-only';

export type Types = Awaited<ReturnType<typeof getTypes>>;

export const getTypes = createQuery({
  cache: {
    keyParts: ['types'],
    options: {
      revalidate: 3600,
      tags: ['types'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;
    return await db.query.type.findMany({
      orderBy: (model, { asc }) => asc(model.name),
    });
  },
});
