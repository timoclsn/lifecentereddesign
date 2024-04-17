import { db } from '@/lib/db';

export const selectTypes = async () => {
  return await db.query.type.findMany({
    orderBy: (type, { asc }) => asc(type.name),
  });
};
