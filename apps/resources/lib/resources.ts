import { Prisma } from 'database';
import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';
import { prisma } from './prisma';
import { withUser } from './users';

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

const includes = (type: ContentType) => {
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

const getNewLikesCount = async (resourceId: number, type: ContentType) => {
  return await prisma.like.count({
    where: {
      resourceId,
      type,
    },
  });
};

export const getResources = async () => {
  const resourcePromises = resourceTypes.map((type) => {
    // @ts-expect-error: Dynamic table access doesn't work on type level
    return prisma[type].findMany({
      include: {
        ...includes(type),
      },
    }) as Promise<Array<Resource>>;
  });

  const resources = await Promise.all(resourcePromises);

  const enhancedResourcesPromises = resources.flat().map(async (resource) => {
    const newLikesCount = await getNewLikesCount(resource.id, resource.type);
    return {
      ...resource,
      likes: resource.likes + newLikesCount,
    };
  });

  const enhancedResources = (
    await Promise.all(enhancedResourcesPromises)
  ).flat();

  return enhancedResources;
};

export const getResourcesCached = reactCache(async () => {
  return await nextCache(getResources, ['resources'], {
    revalidate: 60,
    tags: ['resources'],
  })();
});

export const getResource = async (id: number, type: ContentType) => {
  // @ts-expect-error: Dynamic table access doesn't work on type level
  const resource = (await prisma[type].findUnique({
    where: {
      id: id,
    },
    include: {
      ...includes(type),
    },
  })) as Resource;

  const newLikesCount = await getNewLikesCount(resource.id, resource.type);

  return {
    ...resource,
    likes: resource.likes + newLikesCount,
  };
};

export const getResourceCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = `resource-${resourceType}-${resourceId}`;
    return await nextCache(getResource, [tag], {
      revalidate: 60,
      tags: [tag],
    })(resourceId, resourceType);
  },
);

export const getResourceOldLikesCount = async (
  id: number,
  type: ContentType,
) => {
  // @ts-expect-error: Dynamic table access doesn't work on type level
  const data = (await prisma[type].findUnique({
    where: {
      id: id,
    },
    select: {
      likes: true,
    },
  })) as { likes: number };

  return data.likes;
};

export const getResourceNewLikes = async (id: number, type: ContentType) => {
  return await prisma.like.findMany({
    where: {
      resourceId: id,
      type,
    },
  });
};

export const likeResource = async (
  userId: string,
  id: number,
  type: ContentType,
) => {
  await prisma.like.create({
    data: {
      userId,
      type,
      resourceId: id,
    },
  });
};

export const anonymousLikeResource = async (id: number, type: ContentType) => {
  // @ts-expect-error: Dynamic table access doesn't work on type level
  await prisma[type].update({
    where: {
      id,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
};

export const unlikeResource = async (
  userId: string,
  id: number,
  type: ContentType,
) => {
  await prisma.like.delete({
    where: {
      userId_type_resourceId: {
        userId,
        type,
        resourceId: id,
      },
    },
  });
};

export type LikedResources = Awaited<ReturnType<typeof getLikedResources>>;
export const getLikedResources = async (userId: string) => {
  return await prisma.like.findMany({
    where: {
      userId,
    },
    select: {
      resourceId: true,
      type: true,
    },
  });
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

export type Topic = Prisma.TopicGetPayload<{}>;
export type Topics = Array<Topic>;
export const getTopics = async () => {
  return await prisma.topic.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

export const deleteUserData = async (userId: string) => {
  await prisma.like.deleteMany({
    where: {
      userId,
    },
  });
};

export const getResourceComments = async (id: number, type: ContentType) => {
  const comments = await prisma.comment.findMany({
    where: {
      resourceId: id,
      type,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return withUser(comments);
};

export const addResourceComment = async (
  userId: string,
  resourceId: number,
  type: ContentType,
  text: string,
) => {
  await prisma.comment.create({
    data: {
      userId,
      resourceId,
      type,
      text,
    },
  });
};
