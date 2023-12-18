import { createProtectedQuery, createQuery } from 'data/clients';
import { Prisma, prisma } from 'database';
import { withUserCollection } from 'lib/users';
import 'server-only';
import { z } from 'zod';

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

export const getResources = createQuery({
  cache: {
    keyParts: ['resources'],
    options: {
      revalidate: 60,
      tags: ['resources'],
    },
  },
  query: async ({ ctx }) => {
    const { db } = ctx;

    const resourcePromises = resourceTypes.map((type) => {
      // @ts-expect-error: Dynamic table access doesn't work on type level
      return db[type].findMany({
        include: {
          ...includes(type),
        },
      }) as Promise<Array<Resource>>;
    });

    const resources = await Promise.all(resourcePromises);

    const enhancedResourcesPromises = resources.flat().map(async (resource) => {
      // Doing those two in parallel seems to break the vercel build
      const newLikesCount = await getNewLikesCount(resource.id, resource.type);
      const commentsCount = await getCommentsCount({
        id: resource.id,
        type: resource.type,
      });
      return {
        ...resource,
        likes: resource.likes + newLikesCount,
        comments: commentsCount,
      };
    });

    const enhancedResources = (
      await Promise.all(enhancedResourcesPromises)
    ).flat();

    return enhancedResources;
  },
});

export const getResource = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = `resource-${type}-${id}`;
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { db } = ctx;
    const { id, type } = input;

    // @ts-expect-error: Dynamic table access doesn't work on type level
    const resource = (await db[type].findUnique({
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
  },
});

const getResourceOldLikesCount = async (id: number, type: ContentType) => {
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

const getNewLikesCount = async (resourceId: number, type: ContentType) => {
  return await prisma.like.count({
    where: {
      resourceId,
      type,
    },
  });
};

const getResourceNewLikes = async (id: number, type: ContentType) => {
  return await prisma.like.findMany({
    where: {
      resourceId: id,
      type,
    },
  });
};

export const resourceLikesTag = (resourceId: number, type: ContentType) =>
  `likes-${type}-${resourceId}`;

export const getResourceLikesData = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceLikesTag(id, type);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input }) => {
    const { id, type } = input;

    const [oldLikesCount, newLikesCount] = await Promise.all([
      getResourceOldLikesCount(id, type),
      getResourceNewLikes(id, type),
    ]);

    return {
      oldLikesCount,
      newLikesCount,
    };
  },
});

export type LikedResources = Awaited<ReturnType<typeof getLikedResources>>;

export const getLikedResources = createProtectedQuery({
  cache: {
    noStore: true,
  },
  query: async ({ ctx }) => {
    const { db, userId } = ctx;

    return await db.like.findMany({
      where: {
        userId,
      },
      select: {
        resourceId: true,
        type: true,
      },
    });
  },
});

export const resourceCommentsTag = (resourceId: number, type: ContentType) =>
  `comments-${type}-${resourceId}`;

export const getResourceComments = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceCommentsTag(id, type);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { db } = ctx;
    const { id, type } = input;

    const comments = await db.comment.findMany({
      where: {
        resourceId: id,
        type,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return withUserCollection(comments);
  },
});

export const getCommentsCount = createQuery({
  input: z.object({
    id: z.number(),
    type: z.enum(resourceTypes),
  }),
  cache: ({ input }) => {
    const { id, type } = input;
    const tag = resourceCommentsTag(id, type);
    return {
      keyParts: [tag],
      options: {
        revalidate: 60,
        tags: [tag],
      },
    };
  },
  query: async ({ input, ctx }) => {
    const { id, type } = input;
    const { db } = ctx;

    return await db.comment.count({
      where: {
        resourceId: id,
        type,
      },
    });
  },
});

export type CommentedResources = Awaited<
  ReturnType<typeof getCommentedResources>
>;

export const getCommentedResources = createQuery({
  input: z.object({
    userId: z.string(),
  }),
  cache: {
    noStore: true,
  },
  query: async ({ input, ctx }) => {
    const { userId } = input;
    const { db } = ctx;
    const comments = await db.comment.findMany({
      where: {
        userId,
      },
      select: {
        resourceId: true,
        type: true,
      },
    });

    // Remove duplicates
    return comments.filter(
      (comment, index, self) =>
        index ===
        self.findIndex(
          (selfComment) => selfComment.resourceId === comment.resourceId,
        ),
    );
  },
});
