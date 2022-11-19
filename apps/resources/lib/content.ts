import { prisma } from './prisma';

export type Book = Awaited<ReturnType<typeof getBooks>>[number];

const getBooks = ({ from, till }: Filter) => {
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

const getArticles = ({ from, till }: Filter) => {
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

const getThoghleaders = ({ from, till }: Filter) => {
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

const getPodcastEpisodes = ({ from, till }: Filter) => {
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

const getPodcasts = ({ from, till }: Filter) => {
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

const getDirectories = ({ from, till }: Filter) => {
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

const getVideos = ({ from, till }: Filter) => {
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

const getTools = ({ from, till }: Filter) => {
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

const getCommunities = ({ from, till }: Filter) => {
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

const getCourses = ({ from, till }: Filter) => {
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

const getExamples = ({ from, till }: Filter) => {
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

const getAgencies = ({ from, till }: Filter) => {
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

const getSlides = ({ from, till }: Filter) => {
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

const getMagazines = ({ from, till }: Filter) => {
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

const getNewsletters = ({ from, till }: Filter) => {
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
export type ContentType = Resources[0]['type'];

export interface Filter {
  from?: Date;
  till?: Date;
}

export const getAllResources = async (filter: Filter) => {
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

  return resources.flat();
};

export const likeResource = async (id: number, type: ContentType) => {
  switch (type) {
    case 'AGENCY':
      return await prisma.agency.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'ARTICLE':
      return await prisma.article.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'BOOK':
      return await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'COMMUNITY':
      return await prisma.community.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'COURSE':
      return await prisma.course.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'DIRECTORY':
      return await prisma.directory.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'EXAMPLE':
      return await prisma.example.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'MAGAZINE':
      return await prisma.magazine.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'NEWSLETTER':
      return await prisma.newsletter.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'PODCAST':
      return await prisma.podcast.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'PODCASTEPISODE':
      return await prisma.podcastEpisode.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'SLIDE':
      return await prisma.slide.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'THOUGHTLEADER':
      return await prisma.thoughtleader.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'TOOL':
      return await prisma.tool.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    case 'VIDEO':
      return await prisma.video.update({
        where: {
          id: id,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });
    default:
      throw new Error('Unknown ContentType');
  }
};
