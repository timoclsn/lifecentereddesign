import { createClient } from '@libsql/client';
import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
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
    relatedResources: true;
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
  console.info('Migrating database...');

  const turso = createClient({
    url: TURSO_DATABASE_URL!,
    authToken: TURSO_AUTH_TOKEN,
  });
  const db = drizzle(turso, { schema });

  await db.run(sql`DROP TABLE IF EXISTS resource_fts`);

  await db.run(
    sql`CREATE VIRTUAL TABLE resource_fts USING FTS5(
      id,
      name,
      link,
      short_description,
      description,
      details,
      related_resource_names,
    );`,
  );

  await db.run(
    sql`CREATE TRIGGER insert_resource_fts after INSERT on resource
      BEGIN
        -- Insert the resource
        INSERT INTO resource_fts (id, name, link, short_description,description, details)
        VALUES (NEW.id, NEW.name, NEW.link, NEW.short_description, NEW.description, NEW.details);
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
          link = NEW.link,
          description = NEW.description,
          short_description = NEW.short_description,
          details = NEW.details
        WHERE id = NEW.id;

        -- Update the relatedResource fields of all resources that have this relatedResource
        UPDATE resource_fts
        SET
          related_resource_names = (
            SELECT GROUP_CONCAT(r.name, '; ')
            FROM resource_to_related_resource rtc
            JOIN resource r ON rtc.related_resource_id = r.id
            WHERE rtc.resource_id = resource_fts.id
          )
        WHERE EXISTS (
          SELECT 1
          FROM resource_to_related_resource rtc
          WHERE rtc.related_resource_id = NEW.id AND rtc.resource_id = resource_fts.id
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
    sql`CREATE TRIGGER insert_relatedResource_fts after INSERT on resource_to_related_resource
    BEGIN
      -- Update the relatedResource fields of the resource
      UPDATE resource_fts
      SET
        related_resource_names = (
          SELECT GROUP_CONCAT(r.name, '; ')
          FROM resource_to_related_resource rtc
          JOIN resource r ON rtc.related_resource_id = r.id
          WHERE rtc.resource_id = NEW.resource_id
        )
      WHERE id = NEW.resource_id;
    END;
    `,
  );

  await db.run(
    sql`CREATE TRIGGER delete_relatedResource_fts after DELETE on resource_to_related_resource
    BEGIN
      -- Update the relatedResource fields of the resource
      UPDATE resource_fts
      SET
        related_resource_names = (
          SELECT GROUP_CONCAT(r.name, '; ')
          FROM resource_to_related_resource rtc
          JOIN resource r ON rtc.related_resource_id = r.id
          WHERE rtc.resource_id = OLD.resource_id
        )
      WHERE id = OLD.resource_id;
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

    const slug =
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

      if (oldResource.duration) {
        details.push(`Duration: ${oldResource.duration}`);
      }

      if (oldResource.isbn) {
        details.push(`ISBN: ${oldResource.isbn}`);
      }

      if (oldResource.frequency) {
        details.push(`Frequency: ${oldResource.frequency}`);
      }

      if (oldResource.handle) {
        details.push(`Handle: ${oldResource.handle}`);
      }

      if (details.length > 0) {
        return details.join(' | ');
      }

      return undefined;
    };

    const relatedResourcesPlain = () => {
      if (oldResource.authorsPlain) {
        return oldResource.authorsPlain;
      }

      if (oldResource.hostsPlain) {
        return oldResource.hostsPlain;
      }

      if (oldResource.podcastPlain) {
        return oldResource.podcastPlain;
      }

      if (oldResource.creatorsPlain) {
        return oldResource.creatorsPlain;
      }

      if (oldResource.publisher) {
        return oldResource.publisher;
      }

      if (oldResource.journal) {
        return oldResource.journal;
      }

      return undefined;
    };

    const shortDescription = () => {
      if (oldResource.jobDescription) {
        return oldResource.jobDescription;
      }

      return undefined;
    };

    try {
      // Resource
      var [resourceEntry] = await db
        .insert(resource)
        .values({
          createdAt: oldResource.createdAt,
          name,
          slug,
          suggestion: oldResource.suggestion,
          link: oldResource.link || '',
          typeId: type.id,
          categoryId: category?.id,
          shortDescription: shortDescription(),
          description: oldResource.description,
          details: details(),
          note: oldResource.note,
          date: date(),
          datePlain: oldResource.datePlain,
          anonymousLikesCount: oldResource.likes,
          oldSlug: `${oldResource.type}-${oldResource.id}`,
          relatedResourcesPlain: relatedResourcesPlain(),
        })
        .returning();
    } catch (error) {
      console.error(`Failed to insert resource: ${oldResource.id}`, error);
      return;
    }

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
    await wait(1000);
  });

  await Promise.all(oldResourcePromises);

  const newResources = await db.query.resource.findMany();

  // RelatedResources
  oldResources.forEach(async (oldResource) => {
    const getOldRelatedResources = () => {
      if (oldResource.authors) {
        return oldResource.authors;
      }

      if (oldResource.hosts) {
        return oldResource.hosts;
      }

      if (oldResource.guests) {
        return oldResource.guests;
      }

      if (oldResource.podcast) {
        return oldResource.podcast;
      }

      if (oldResource.creators) {
        return oldResource.creators;
      }

      return [];
    };

    const oldRelatedResources = getOldRelatedResources();

    if (oldRelatedResources.length === 0) {
      return;
    }

    const newRelatedResourceIds = oldRelatedResources.map(
      (oldRelatedResource) => {
        const newRelatedResource = newResources.find(
          (newResource) => newResource.name === oldRelatedResource.name,
        );

        if (!newRelatedResource) {
          throw new Error(
            `RelatedResource ${oldRelatedResource.name} not found`,
          );
        }

        return newRelatedResource.id;
      },
    );

    const newResource = newResources.find(
      (resource) =>
        resource.oldSlug === `${oldResource.type}-${oldResource.id}`,
    );

    if (!newResource) {
      throw new Error(
        `Resource ${oldResource.type}-${oldResource.id} not found`,
      );
    }

    await db.insert(resourceToRelatedResource).values(
      newRelatedResourceIds.map((relatedResourceId) => ({
        resourceId: newResource.id,
        relatedResourceId,
      })),
    );

    await wait(1000);
  });

  const oldLikes = await prisma.like.findMany();

  oldLikes.forEach(async (oldLike) => {
    const oldResource = oldResources.find(
      (resource) =>
        resource.id === oldLike.resourceId && resource.type === oldLike.type,
    );

    if (!oldResource) {
      throw new Error(`Resource ${oldLike.resourceId} not found`);
    }

    const newResource = newResources.find(
      (resource) =>
        resource.oldSlug === `${oldResource.type}-${oldResource.id}`,
    );

    if (!newResource) {
      throw new Error(
        `Resource ${oldResource.type}-${oldResource.id} not found`,
      );
    }

    try {
      await db.insert(like).values({
        resourceId: newResource.id,
        userId: oldLike.userId,
      });
    } catch (error) {
      console.error(`Failed to insert like: ${oldLike.id}`, error);
      return;
    }

    await wait(1000);
  });

  const oldComments = await prisma.comment.findMany();

  oldComments.forEach(async (oldComment) => {
    const oldResource = oldResources.find(
      (resource) =>
        resource.id === oldComment.resourceId &&
        resource.type === oldComment.type,
    );

    if (!oldResource) {
      throw new Error(`Resource ${oldComment.resourceId} not found`);
    }

    const newResource = newResources.find(
      (resource) =>
        resource.oldSlug === `${oldResource.type}-${oldResource.id}`,
    );

    if (!newResource) {
      throw new Error(
        `Resource ${oldResource.type}-${oldResource.id} not found`,
      );
    }

    try {
      await db.insert(comment).values({
        resourceId: newResource.id,
        userId: oldComment.userId,
        text: oldComment.text,
      });
    } catch (error) {
      console.error(`Failed to insert comment: ${oldComment.id}`, error);
      return;
    }

    await wait(1000);
  });

  console.info('Migrating complete.');
};

main();
