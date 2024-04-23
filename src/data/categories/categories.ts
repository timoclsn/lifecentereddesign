import { db } from '@/lib/db';

export const selectCategories = async () => {
  return await db.query.category.findMany({
    orderBy: (category, { asc }) => asc(category.name),
  });
};
