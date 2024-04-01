import { createClient } from '@libsql/client';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import {
  category,
  comment,
  like,
  resource,
  resourceToCreator,
  resourceToTopic,
  topic,
  type,
} from './schema';
import { sql } from 'drizzle-orm';

const COUNT = 10;

const main = async () => {
  console.info('Seeding database...');

  const turso = createClient({
    url: 'file:local.db',
  });
  const db = drizzle(turso);

  await db.run(sql`DROP TABLE IF EXISTS resource_fts`);

  await db.run(
    sql`CREATE VIRTUAL TABLE resource_fts USING FTS5(
      id,
      name,
      description,
      details
    );`,
  );

  await db.run(
    sql`CREATE TRIGGER insert_resource_fts after INSERT on resource
      begin
        INSERT INTO resource_fts (id, name, description, details)
        VALUES (NEW.id, NEW.name, NEW.description, NEW.details);
      end;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER update_resource_fts after UPDATE on resource
      begin
        UPDATE resource_fts
          SET
            name = NEW.name,
            description = NEW.description,
            details = NEW.details
          WHERE id = NEW.id;
      end;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER delete_resource_fts after DELETE on resource
      begin
        DELETE FROM resource_fts
        WHERE id = OLD.id;
      end;
    `,
  );

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
