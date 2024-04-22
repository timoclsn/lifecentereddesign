import { sluggify } from '@/lib/utils/utils';
import { createClient } from '@libsql/client';
import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import {
  category,
  comment,
  like,
  resource,
  resourceToRelatedResource,
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
  const db = drizzle(turso, { schema });

  await db.run(sql`DROP TABLE IF EXISTS resource_fts`);

  await db.run(
    sql`CREATE VIRTUAL TABLE resource_fts USING FTS5(
      id,
      name,
      description,
      details,
      creator_names,
      creator_descriptions,
      creator_details,
    );`,
  );

  await db.run(
    sql`CREATE TRIGGER insert_resource_fts after INSERT on resource
      BEGIN
        -- Insert the resource
        INSERT INTO resource_fts (id, name, description, details)
        VALUES (NEW.id, NEW.name, NEW.description, NEW.details);
      END;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER update_resource_fts after UPDATE on resource
      BEGIN
        -- Update the resource with new values
        UPDATE resource_fts
        SET
          name = NEW.name,
          description = NEW.description,
          details = NEW.details
        WHERE id = NEW.id;

        -- Update the creator fields of all resources that have this creator
        UPDATE resource_fts
        SET 
          creator_names = (
            SELECT GROUP_CONCAT(r.name, '; ')
            FROM resource_to_creator rtc
            JOIN resource r ON rtc.creator_id = r.id
            WHERE rtc.resource_id = resource_fts.id
          ),
          creator_descriptions = (
            SELECT GROUP_CONCAT(r.description, '; ')
            FROM resource_to_creator rtc
            JOIN resource r ON rtc.creator_id = r.id
            WHERE rtc.resource_id = resource_fts.id
          ),
          creator_details = (
            SELECT GROUP_CONCAT(r.details, '; ')
            FROM resource_to_creator rtc
            JOIN resource r ON rtc.creator_id = r.id
            WHERE rtc.resource_id = resource_fts.id
          )
        WHERE EXISTS (
          SELECT 1
          FROM resource_to_creator rtc
          WHERE rtc.creator_id = NEW.id AND rtc.resource_id = resource_fts.id
        );
      END;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER delete_resource_fts after DELETE on resource
      BEGIN
        -- Delete the resource
        DELETE FROM resource_fts
        WHERE id = OLD.id;
      END;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER insert_creator_fts after INSERT on resource_to_creator
    BEGIN
      -- Update the creator fields of the resource
      UPDATE resource_fts
      SET 
        creator_names = (
          SELECT GROUP_CONCAT(r.name, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        ),
        creator_descriptions = (
          SELECT GROUP_CONCAT(r.description, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        ),
        creator_details = (
          SELECT GROUP_CONCAT(r.details, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        )
      WHERE id = NEW.resource_id;
    END;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER delete_creator_fts after DELETE on resource_to_creator
    BEGIN
      -- Update the creator fields of the resource
      UPDATE resource_fts
      SET 
        creator_names = (
          SELECT GROUP_CONCAT(r.name, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        ),
        creator_descriptions = (
          SELECT GROUP_CONCAT(r.description, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        ),
        creator_details = (
          SELECT GROUP_CONCAT(r.details, '; ')
          FROM resource_to_creator rtc
          JOIN resource r ON rtc.creator_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        )
      WHERE id = NEW.resource_id;
    END;
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
      id: sluggify(`Resource ${i + 1}`),
      name: `Resource ${i + 1}`,
      link: `Link ${i + 1}`,
      typeId: Math.floor(Math.random() * COUNT) + 1,
      categoryId: Math.floor(Math.random() * COUNT) + 1,
    })),
  );

  // Link resources to topics
  await db.insert(resourceToTopic).values(
    Array.from({ length: COUNT }, (_, i) => ({
      resourceId: String(i + 1),
      topicId: i + 1,
    })),
  );

  // Link resources to creators
  await db.insert(resourceToRelatedResource).values(
    Array.from({ length: COUNT }, (_, i) => ({
      resourceId: String(i + 1),
      relatedResourceId: String(i + 1),
    })),
  );

  // Insert likes
  await db.insert(like).values(
    Array.from({ length: 50 }, (_, i) => ({
      userId: `userId-${i + 1}`,
      resourceId: String(Math.floor(Math.random() * COUNT) + 1),
    })),
  );

  // Insert Comments
  await db.insert(comment).values(
    Array.from({ length: 50 }, (_, i) => ({
      userId: `userId-${i + 1}`,
      resourceId: String(Math.floor(Math.random() * COUNT) + 1),
      text: `Comment ${i + 1}`,
    })),
  );

  console.info('Seeding complete.');
};

main();
