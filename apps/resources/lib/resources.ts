import { Prisma } from 'database';
import { prisma } from './prisma';

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

export type Thoughtleader = Prisma.ThoughtleaderGetPayload<{
  include: {
    category: true;
  };
}>;

export type Article = Prisma.ArticleGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type Book = Prisma.BookGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type Podcast = Prisma.PodcastGetPayload<{
  include: {
    category: true;
    hosts: true;
  };
}>;

export type PodcastEpisode = Prisma.PodcastEpisodeGetPayload<{
  include: {
    category: true;
    guests: true;
    podcast: true;
  };
}>;

export type Directory = Prisma.DirectoryGetPayload<{
  include: {
    category: true;
  };
}>;

export type Video = Prisma.VideoGetPayload<{
  include: {
    category: true;
    creators: true;
  };
}>;

export type Tool = Prisma.ToolGetPayload<{
  include: {
    category: true;
  };
}>;

export type Community = Prisma.CommunityGetPayload<{
  include: {
    category: true;
  };
}>;

export type Course = Prisma.CourseGetPayload<{
  include: {
    category: true;
  };
}>;

export type Example = Prisma.ExampleGetPayload<{
  include: {
    category: true;
  };
}>;

export type Agency = Prisma.AgencyGetPayload<{
  include: {
    category: true;
  };
}>;

export type Slide = Prisma.SlideGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type Magazine = Prisma.MagazineGetPayload<{
  include: {
    category: true;
  };
}>;

export type Newsletter = Prisma.NewsletterGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type Paper = Prisma.PaperGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type SocialMediaProfile = Prisma.SocialMediaProfileGetPayload<{
  include: {
    category: true;
  };
}>;

export type Report = Prisma.ReportGetPayload<{
  include: {
    category: true;
    authors: true;
  };
}>;

export type Resource =
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
  | Report;

export type Resources = Array<Resource>;
export type ContentType = Resource['type'];

export interface QueryFilter {
  from?: Date;
  till?: Date;
  limit?: number;
  sort?: 'date' | 'title' | 'likes';
}

export const getResources = async ({
  from,
  till,
  limit,
  sort,
}: QueryFilter = {}) => {
  const dbPromises = resourceTypes.map((type) => {
    // @ts-expect-error: Dynamic table access doesn't work on type level
    return prisma[type].findMany({
      include: {
        category: true,
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
      },
      where: {
        createdAt:
          from && till
            ? {
                gte: from,
                lte: till,
              }
            : undefined,
      },
    }) as Promise<Resource>;
  });

  const resources = await Promise.all(dbPromises);

  return resources
    .flat()
    .sort((a, b) => {
      if (sort === 'date') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'title') {
        const itemA = 'title' in a ? a.title : a.name;
        const itemB = 'title' in b ? b.title : b.name;
        return itemA.localeCompare(itemB);
      } else if (sort === 'likes') {
        return b.likes - a.likes;
      }
      return 0;
    })
    .slice(0, limit);
};

export const getResourceLikes = async (id: number, type: ContentType) => {
  // @ts-expect-error: Dynamic table access doesn't work on type level
  return (await prisma[type].findUnique({
    where: {
      id: id,
    },
    select: {
      likes: true,
    },
  })) as { likes: number };
};

export const likeResource = async (id: number, type: ContentType) => {
  // @ts-expect-error: Dynamic table access doesn't work on type level
  return (await prisma[type].update({
    where: {
      id: id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
    select: {
      likes: true,
    },
  })) as { likes: number };
};

export type Category = Prisma.CategoryGetPayload<{}>;
export type Categories = Array<Category>;

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};
