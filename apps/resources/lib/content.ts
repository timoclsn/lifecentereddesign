import { prisma } from './prisma';

export type Book = Awaited<ReturnType<typeof getBooks>>[number];

const getBooks = ({ from, till }: QueryFilter) => {
  return prisma.book.findMany({
    include: {
      authors: true,
      category: true,
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
  });
};

export type Article = Awaited<ReturnType<typeof getArticles>>[number];

const getArticles = ({ from, till }: QueryFilter) => {
  return prisma.article.findMany({
    include: {
      authors: true,
      category: true,
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
  });
};

export type Thoughtleader = Awaited<ReturnType<typeof getThoghleaders>>[number];

const getThoghleaders = ({ from, till }: QueryFilter) => {
  return prisma.thoughtleader.findMany({
    include: {
      category: true,
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
  });
};

export type PodcastEpisode = Awaited<
  ReturnType<typeof getPodcastEpisodes>
>[number];

const getPodcastEpisodes = ({ from, till }: QueryFilter) => {
  return prisma.podcastEpisode.findMany({
    include: {
      guests: true,
      podcast: true,
      category: true,
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
  });
};

export type Podcast = Awaited<ReturnType<typeof getPodcasts>>[number];

const getPodcasts = ({ from, till }: QueryFilter) => {
  return prisma.podcast.findMany({
    include: {
      hosts: true,
      category: true,
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
  });
};

export type Directory = Awaited<ReturnType<typeof getDirectories>>[number];

const getDirectories = ({ from, till }: QueryFilter) => {
  return prisma.directory.findMany({
    include: {
      category: true,
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
  });
};

export type Video = Awaited<ReturnType<typeof getVideos>>[number];

const getVideos = ({ from, till }: QueryFilter) => {
  return prisma.video.findMany({
    include: {
      creators: true,
      category: true,
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
  });
};

export type Tool = Awaited<ReturnType<typeof getTools>>[number];

const getTools = ({ from, till }: QueryFilter) => {
  return prisma.tool.findMany({
    include: {
      category: true,
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
  });
};

export type Community = Awaited<ReturnType<typeof getCommunities>>[number];

const getCommunities = ({ from, till }: QueryFilter) => {
  return prisma.community.findMany({
    include: {
      category: true,
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
  });
};

export type Course = Awaited<ReturnType<typeof getCourses>>[number];

const getCourses = ({ from, till }: QueryFilter) => {
  return prisma.course.findMany({
    include: {
      category: true,
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
  });
};

export type Example = Awaited<ReturnType<typeof getExamples>>[number];

const getExamples = ({ from, till }: QueryFilter) => {
  return prisma.example.findMany({
    include: {
      category: true,
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
  });
};

export type Agency = Awaited<ReturnType<typeof getAgencies>>[number];

const getAgencies = ({ from, till }: QueryFilter) => {
  return prisma.agency.findMany({
    include: {
      category: true,
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
  });
};

export type Slide = Awaited<ReturnType<typeof getSlides>>[number];

const getSlides = ({ from, till }: QueryFilter) => {
  return prisma.slide.findMany({
    include: {
      authors: true,
      category: true,
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
  });
};

export type Magazine = Awaited<ReturnType<typeof getMagazines>>[number];

const getMagazines = ({ from, till }: QueryFilter) => {
  return prisma.magazine.findMany({
    include: {
      category: true,
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
  });
};

export type Newsletter = Awaited<ReturnType<typeof getNewsletters>>[number];

const getNewsletters = ({ from, till }: QueryFilter) => {
  return prisma.newsletter.findMany({
    include: {
      authors: true,
      category: true,
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
  });
};

export type Resources = Awaited<ReturnType<typeof getAllResources>>;
export type Resource = Resources[number];
export type ContentType = Resource['type'];

export interface QueryFilter {
  from?: Date;
  till?: Date;
  limit?: number;
  sort?: 'date' | 'title' | 'likes';
}

export const getAllResources = async (filter: QueryFilter) => {
  const resources = await Promise.all([
    getBooks(filter),
    getThoghleaders(filter),
    getArticles(filter),
    getCourses(filter),
    getPodcastEpisodes(filter),
    getPodcasts(filter),
    getVideos(filter),
    getTools(filter),
    getDirectories(filter),
    getCommunities(filter),
    getExamples(filter),
    getAgencies(filter),
    getSlides(filter),
    getMagazines(filter),
    getNewsletters(filter),
  ]);

  return resources
    .flat()
    .sort((a, b) => {
      if (filter.sort === 'date') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (filter.sort === 'title') {
        const itemA = 'title' in a ? a.title : a.name;
        const itemB = 'title' in b ? b.title : b.name;
        return itemA.localeCompare(itemB);
      } else if (filter.sort === 'likes') {
        return b.likes - a.likes;
      }
      return 0;
    })
    .slice(0, filter.limit);
};

export const likeResource = async (id: number, type: ContentType) => {
  // @ts-ignore
  return (await prisma[type].update({
    where: {
      id: id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  })) as Resource;
};

export const getResourceLikes = async (id: number, type: ContentType) => {
  // @ts-ignore
  return (await prisma[type].findUnique({
    where: {
      id: id,
    },
    select: {
      likes: true,
    },
  })) as { likes: number };
};
