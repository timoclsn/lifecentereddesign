import { db } from '@/lib/db';

export const selectTopics = async () => {
  return await db.query.topic.findMany({
    orderBy: (topic, { asc }) => asc(topic.name),
  });
};
