import { createClient } from '@libsql/client';
import 'dotenv/config';
import { sql } from 'drizzle-orm';
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
import { prisma } from '@/lib/db/prisma';
import { Prisma } from '@prisma/client';
import * as schema from './schema';
import { sluggify, wait } from '@/lib/utils/utils';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export type ThoughtleaderBasic = Prisma.ThoughtleaderGetPayload<{}>;
export type Thoughtleader = Prisma.ThoughtleaderGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Article = Prisma.ArticleGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type Book = Prisma.BookGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type Podcast = Prisma.PodcastGetPayload<{
  include: {
    category: true;
    topics: true;
    hosts: true;
  };
}>;

export type PodcastEpisode = Prisma.PodcastEpisodeGetPayload<{
  include: {
    category: true;
    topics: true;
    guests: true;
    podcast: true;
  };
}>;

export type Directory = Prisma.DirectoryGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Video = Prisma.VideoGetPayload<{
  include: {
    category: true;
    topics: true;
    creators: true;
  };
}>;

export type Tool = Prisma.ToolGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Community = Prisma.CommunityGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Course = Prisma.CourseGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Example = Prisma.ExampleGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Agency = Prisma.AgencyGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Slide = Prisma.SlideGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type Magazine = Prisma.MagazineGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Newsletter = Prisma.NewsletterGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type Paper = Prisma.PaperGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type SocialMediaProfile = Prisma.SocialMediaProfileGetPayload<{
  include: {
    category: true;
    topics: true;
  };
}>;

export type Report = Prisma.ReportGetPayload<{
  include: {
    category: true;
    topics: true;
    authors: true;
  };
}>;

export type Resource = (
  | Thoughtleader
  | Article
  | Book
  | Podcast
  | PodcastEpisode
  | Video
  | Directory
  | Tool
  | Community
  | Course
  | Example
  | Agency
  | Slide
  | Magazine
  | Newsletter
  | Paper
  | SocialMediaProfile
  | Report
) & { comments: number };

export type Resources = Array<Resource>;
export type ContentType = Resource['type'];

export const includes = (type: ContentType) => {
  return {
    category: true,
    topics: true,
    ...(type === 'book' && {
      authors: true,
    }),
    ...(type === 'article' && {
      authors: true,
    }),
    ...(type === 'podcastEpisode' && {
      guests: true,
      podcast: true,
    }),
    ...(type === 'podcast' && {
      hosts: true,
    }),
    ...(type === 'video' && {
      creators: true,
    }),
    ...(type === 'slide' && {
      authors: true,
    }),
    ...(type === 'newsletter' && {
      authors: true,
    }),
    ...(type === 'paper' && {
      authors: true,
    }),
    ...(type === 'report' && {
      authors: true,
    }),
  };
};

export const resourceTypes = [
  'thoughtleader',
  'article',
  'book',
  'podcast',
  'podcastEpisode',
  'directory',
  'video',
  'tool',
  'community',
  'course',
  'example',
  'agency',
  'slide',
  'magazine',
  'newsletter',
  'paper',
  'socialMediaProfile',
  'report',
] as const;

const types = [
  'Agency',
  'Article',
  'Book',
  'Community',
  'Course',
  'Directory',
  'Example',
  'Magazine',
  'Newsletter',
  'Paper',
  'Podcast',
  'Podcast Episode',
  'Report',
  'Slide',
  'Social Media Profile',
  'Thoughtleader',
  'Tool',
  'Video',
];

const COUNT = 10;

const main = async () => {
  console.info('Seeding database...');

  const turso = createClient({
    url: 'file:local.db',
    // url: TURSO_DATABASE_URL!,
    // authToken: TURSO_AUTH_TOKEN,
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
        )
      WHERE id = NEW.resource_id;
    END;
    `,
  );

  // Insert types
  await db.insert(type).values(
    types.map((name) => ({
      name,
    })),
  );

  // Insert categories

  const categories = await prisma.category.findMany();

  await db.insert(category).values(
    categories.map((category) => ({
      name: category.name,
    })),
  );

  const topics = await prisma.topic.findMany();

  // Insert topics
  await db.insert(topic).values(
    topics.map((topic) => ({
      name: topic.name,
    })),
  );

  const resourcePromises = resourceTypes.map((type) => {
    // @ts-expect-error: Dynamic table access doesn't work on type level
    return prisma[type].findMany({
      include: {
        ...includes(type),
      },
    }) as Promise<Array<Resource>>;
  });

  const resourceArrays = await Promise.all(resourcePromises);
  const oldResources = resourceArrays.flat().sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  // Insert resources
  const newTypes = await db.query.type.findMany();
  const newCategories = await db.query.category.findMany();
  const newTopics = await db.query.topic.findMany();

  const oldResourcePromises = oldResources.map(async (oldResource) => {
    const name = oldResource.name ? oldResource.name : oldResource.title;

    const type = newTypes.find(
      (type) =>
        type.name.replace(/\s/g, '').toLowerCase() ===
        oldResource.type.toLowerCase(),
    );

    if (!type) {
      throw new Error(`Type ${oldResource.type} not found`);
    }

    const allInsatncesWithName = oldResources.filter((resource) => {
      const resourceName = resource.name ? resource.name : resource.title;
      return sluggify(resourceName) === sluggify(name);
    });

    const id =
      allInsatncesWithName.length > 1
        ? sluggify(`${name}-${oldResource.type}-${oldResource.id}`)
        : sluggify(name);

    const category = newCategories.find(
      (category) => category.name === oldResource.category?.name,
    );

    const date = () => {
      if (oldResource.date) {
        return oldResource.date;
      }

      if (oldResource.publishingDate) {
        return oldResource.publishingDate;
      }

      return undefined;
    };

    const details = () => {
      const details = [];

      if (oldResource.jobDescription) {
        details.push(`Job Description: ${oldResource.jobDescription}`);
      }

      if (oldResource.duration) {
        details.push(`Duration: ${oldResource.duration}`);
      }

      if (oldResource.publisher) {
        details.push(`Publisher: ${oldResource.publisher}`);
      }

      if (oldResource.isbn) {
        details.push(`Isbn: ${oldResource.isbn}`);
      }

      if (details.length > 0) {
        return details.join(' | ');
      }

      return undefined;
    };

    const creatorsPlain = () => {
      if (oldResource.authorsPlain) {
        return oldResource.authorsPlain;
      }

      if (oldResource.hostsPlain) {
        return oldResource.hostsPlain;
      }
    };

    // Resource
    const [resourceEntry] = await db
      .insert(resource)
      .values({
        createdAt: oldResource.createdAt,
        name,
        id,
        suggestion: oldResource.suggestion,
        link: oldResource.link || '',
        typeId: type.id,
        categoryId: category?.id,
        description: oldResource.description,
        details: details(),
        note: oldResource.note,
        date: date(),
        datePlain: oldResource.datePlain,
        anonymousLikes: oldResource.likes,
        oldSlug: `${oldResource.type}-${oldResource.id}`,
        creatorsPlain: creatorsPlain(),
      })
      .returning();

    // Topics
    const newTopicIds = oldResource.topics.map((oldTopic) => {
      const newTopic = newTopics.find(
        (newTopic) => newTopic.name === oldTopic.name,
      );

      if (!newTopic) {
        throw new Error(`Topic ${topic.name} not found`);
      }

      return newTopic.id;
    });

    if (newTopicIds.length > 0) {
      await db.insert(resourceToTopic).values(
        newTopicIds.map((topicId) => ({
          resourceId: resourceEntry.id,
          topicId,
        })),
      );
    }
    await wait(500);
  });

  await Promise.all(oldResourcePromises);

  const newResources = await db.query.resource.findMany();

  console.log(newResources.length);

  // Creators
  oldResources.forEach(async (oldResource) => {
    const getOldCreators = () => {
      if (oldResource.authors) {
        return oldResource.authors;
      }

      if (oldResource.hosts) {
        return oldResource.hosts;
      }

      if (oldResource.guests) {
        return oldResource.guests;
      }

      if (oldResource.creators) {
        return oldResource.creators;
      }

      return [];
    };

    const oldCreators = getOldCreators();

    if (oldCreators.length === 0) {
      return;
    }

    const newCreatorIds = oldCreators.map((oldCreator) => {
      const newCreator = newResources.find(
        (newResource) => newResource.name === oldCreator.name,
      );

      if (!newCreator) {
        throw new Error(`Creator ${oldCreator.name} not found`);
      }

      return newCreator.id;
    });

    const newResource = newResources.find(
      (resource) =>
        resource.oldSlug === `${oldResource.type}-${oldResource.id}`,
    );

    if (!newResource) {
      throw new Error(
        `Resource ${oldResource.type}-${oldResource.id} not found`,
      );
    }

    await db.insert(resourceToCreator).values(
      newCreatorIds.map((creatorId) => ({
        resourceId: newResource.id,
        creatorId,
      })),
    );

    await wait(500);
  });

  // Link resources to topics
  // await db.insert(resourceToTopic).values(
  //   Array.from({ length: COUNT }, (_, i) => ({
  //     resourceId: String(i + 1),
  //     topicId: i + 1,
  //   })),
  // );

  // Link resources to creators
  // await db.insert(resourceToCreator).values(
  //   Array.from({ length: COUNT }, (_, i) => ({
  //     resourceId: String(i + 1),
  //     creatorId: String(i + 1),
  //   })),
  // );

  // Insert likes
  // await db.insert(like).values(
  //   Array.from({ length: 50 }, (_, i) => ({
  //     userId: `userId-${i + 1}`,
  //     resourceId: String(Math.floor(Math.random() * COUNT) + 1),
  //   })),
  // );

  // Insert Comments
  // await db.insert(comment).values(
  //   Array.from({ length: 50 }, (_, i) => ({
  //     userId: `userId-${i + 1}`,
  //     resourceId: String(Math.floor(Math.random() * COUNT) + 1),
  //     text: `Comment ${i + 1}`,
  //   })),
  // );

  console.info('Seeding complete.');
};

main();
