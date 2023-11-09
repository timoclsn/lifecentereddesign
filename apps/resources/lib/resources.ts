import { Prisma } from 'database';
import { prisma } from './prisma';
import { withUserCollection } from './users';

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

// All resources

/**
 * Retrieves all resources from the database and enhances them with additional data.
 * @returns A Promise that resolves to an array of enhanced resources.
 */
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
    // Doing those two in parallel seems to break the vercel build
    const newLikesCount = await getNewLikesCount(resource.id, resource.type);
    const commentsCount = await getCommentsCount(resource.id, resource.type);
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
};

// Single resource

/**
 * Retrieves a resource by its ID and type, and returns it with an updated like count.
 * @param id - The ID of the resource to retrieve.
 * @param type - The type of the resource to retrieve.
 * @returns The retrieved resource with an updated like count.
 */
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

// Likes

/**
 * Retrieves the number of likes for a resource of a given type and ID.
 * @param id - The ID of the resource.
 * @param type - The type of the resource.
 * @returns The number of likes for the resource.
 */
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

/**
 * Returns the number of new likes for a given resource and content type.
 * @param resourceId - The ID of the resource to check for new likes.
 * @param type - The content type of the resource.
 * @returns The number of new likes for the given resource and content type.
 */
const getNewLikesCount = async (resourceId: number, type: ContentType) => {
  return await prisma.like.count({
    where: {
      resourceId,
      type,
    },
  });
};

/**
 * Retrieves all likes for a given resource ID and content type.
 * @param id - The ID of the resource to retrieve likes for.
 * @param type - The content type of the resource.
 * @returns A Promise that resolves to an array of likes.
 */
const getResourceNewLikes = async (id: number, type: ContentType) => {
  return await prisma.like.findMany({
    where: {
      resourceId: id,
      type,
    },
  });
};

/**
 * Retrieves the old likes count and new likes data for a given resource.
 * @param resourceId - The ID of the resource to retrieve likes data for.
 * @param resourceType - The type of the resource to retrieve likes data for.
 * @returns An object containing the old likes count and new likes data.
 */
export const getResourceLikesData = async (
  resourceId: number,
  resourceType: ContentType,
) => {
  const [oldLikesCount, newLikes] = await Promise.all([
    getResourceOldLikesCount(resourceId, resourceType),
    getResourceNewLikes(resourceId, resourceType),
  ]);
  return {
    oldLikesCount,
    newLikes,
  };
};

/**
 * Creates a new like for a resource.
 * @param userId - The ID of the user who is liking the resource.
 * @param id - The ID of the resource being liked.
 * @param type - The type of content the resource is.
 */
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

/**
 * Increments the number of likes for a resource of the given type with the specified ID.
 * @param id - The ID of the resource to like.
 * @param type - The type of the resource to like.
 */
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

/**
 * Removes a like from a resource for a given user.
 * @param userId - The ID of the user who liked the resource.
 * @param id - The ID of the resource to remove the like from.
 * @param type - The type of the resource.
 */
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
/**
 * Retrieves a list of resources that a user has liked.
 * @param userId - The ID of the user whose liked resources to retrieve.
 * @returns A Promise that resolves to an array of objects containing the IDs and types of the user's liked resources.
 */
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

// Categories

export type Category = Prisma.CategoryGetPayload<{}>;
export type Categories = Array<Category>;

/**
 * Retrieves a list of categories from the database.
 * @returns A promise that resolves to an array of Category objects.
 */
export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

// Topics

export type Topic = Prisma.TopicGetPayload<{}>;
export type Topics = Array<Topic>;

/**
 * Retrieves all topics from the database.
 * @returns A promise that resolves to an array of topics sorted by name in ascending order.
 */
export const getTopics = async () => {
  return await prisma.topic.findMany({
    orderBy: {
      name: 'asc',
    },
  });
};

// Users

/**
 * Deletes all user data associated with the given userId.
 * @param userId - The ID of the user whose data will be deleted.
 */
export const deleteUserData = async (userId: string) => {
  await prisma.like.deleteMany({
    where: {
      userId,
    },
  });
  await prisma.comment.deleteMany({
    where: {
      userId,
    },
  });
};

// Comments

/**
 * Retrieves comments for a resource with the given ID and content type.
 * @param id - The ID of the resource to retrieve comments for.
 * @param type - The content type of the resource.
 * @returns A Promise that resolves to an array of comments for the resource.
 */
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

  return withUserCollection(comments);
};

/**
 * Returns the number of comments for a given resource ID and content type.
 * @param id - The ID of the resource.
 * @param type - The content type of the resource.
 * @returns The number of comments for the given resource ID and content type.
 */
export const getCommentsCount = async (id: number, type: ContentType) => {
  return await prisma.comment.count({
    where: {
      resourceId: id,
      type,
    },
  });
};

/**
 * Adds a comment to a resource.
 * @param userId - The ID of the user adding the comment.
 * @param resourceId - The ID of the resource being commented on.
 * @param type - The type of content being commented on.
 * @param text - The text of the comment.
 */
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

/**
 * Deletes a resource comment with the given ID and user ID.
 * @param id - The ID of the comment to delete.
 * @param userId - The ID of the user who created the comment.
 */
export const deleteResourceComment = async (id: number, userId: string) => {
  await prisma.comment.delete({
    where: {
      id,
      userId,
    },
  });
};

export type CommentedResources = Awaited<
  ReturnType<typeof getCommentedResources>
>;
/**
 * Retrieves a list of commented resources for a given user.
 * @param userId The ID of the user to retrieve commented resources for.
 * @returns A Promise that resolves to an array of commented resources.
 */
export const getCommentedResources = async (userId: string) => {
  const comments = await prisma.comment.findMany({
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
};
