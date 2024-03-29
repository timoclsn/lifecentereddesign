import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import {
  category,
  comment,
  creator,
  like,
  resource,
  resourceToCreator,
  resourceToTopic,
  topic,
  type,
} from './schema';

const COUNT = 10;

const main = async () => {
  console.info('Seeding database...');

  const turso = createClient({
    url: 'file:local.db',
  });
  const db = drizzle(turso);

  // Insert types
  await db.insert(type).values(
    Array.from({ length: COUNT }, (_, i) => ({
      name: `Type ${i + 1}`,
    })),
  );

  // Insert categories
  await db.insert(category).values(
    Array.from({ length: COUNT }, (_, i) => ({
      name: `Category ${i + 1}`,
    })),
  );

  // Insert topics
  await db.insert(topic).values(
    Array.from({ length: COUNT }, (_, i) => ({
      name: `Topic ${i + 1}`,
    })),
  );

  // Insert creators
  await db.insert(creator).values(
    Array.from({ length: COUNT }, (_, i) => ({
      name: `Creator ${i + 1}`,
      description: `Description ${i + 1}`,
    })),
  );

  // Insert resources
  await db.insert(resource).values(
    Array.from({ length: COUNT }, (_, i) => ({
      name: `Resource ${i + 1}`,
      link: `Link ${i + 1}`,
      typeId: Math.floor(Math.random() * COUNT) + 1,
      categoryId: Math.floor(Math.random() * COUNT) + 1,
    })),
  );

  // Link resources to topics
  await db.insert(resourceToTopic).values(
    Array.from({ length: COUNT }, (_, i) => ({
      resourceId: i + 1,
      topicId: i + 1,
    })),
  );

  // Link resources to creators
  await db.insert(resourceToCreator).values(
    Array.from({ length: COUNT }, (_, i) => ({
      resourceId: i + 1,
      creatorId: i + 1,
    })),
  );

  // Insert likes
  await db.insert(like).values(
    Array.from({ length: 50 }, (_, i) => ({
      userId: `userId-${i + 1}`,
      resourceId: Math.floor(Math.random() * COUNT) + 1,
    })),
  );

  // Insert Comments
  await db.insert(comment).values(
    Array.from({ length: 50 }, (_, i) => ({
      userId: `userId-${i + 1}`,
      resourceId: Math.floor(Math.random() * COUNT) + 1,
      text: `Comment ${i + 1}`,
    })),
  );

  console.info('Seeding complete.');
};

main();
