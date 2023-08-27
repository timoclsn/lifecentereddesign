import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';
import {
  ContentType,
  getCategories,
  getCommentsCount,
  getResource,
  getResourceComments,
  getResourceLikesData,
  getResources,
  getTopics,
} from './resources';

// All resources

export const getResourcesCached = reactCache(async () => {
  const tag = 'resources';
  return await nextCache(getResources, [tag], {
    revalidate: 60,
    tags: [tag],
  })();
});

// Single resource

export const getResourceCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = `resource-${resourceType}-${resourceId}`;
    return await nextCache(getResource, [tag], {
      revalidate: 60,
      tags: [tag],
    })(resourceId, resourceType);
  },
);

// Categories

export const getCategoriesCached = reactCache(async () => {
  const tag = 'categories';
  return await nextCache(getCategories, [tag], {
    revalidate: 60,
    tags: [tag],
  })();
});

// Topics

export const getTopicsCached = reactCache(async () => {
  const tag = 'topics';
  return await nextCache(getTopics, [tag], {
    revalidate: 60,
    tags: [tag],
  })();
});

// Likes

export const resourceLikesTag = (resourceId: number, type: ContentType) =>
  `likes-${type}-${resourceId}`;

export const getResourceLikesDataCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = resourceLikesTag(resourceId, resourceType);
    return await nextCache(getResourceLikesData, [tag], {
      revalidate: 60,
      tags: [tag],
    })(resourceId, resourceType);
  },
);

// Comments

export const resourceCommentsTag = (resourceId: number, type: ContentType) =>
  `comments-${type}-${resourceId}`;

export const getResourceCommentsCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = resourceCommentsTag(resourceId, resourceType);
    return await nextCache(getResourceComments, [tag], {
      revalidate: 60,
      tags: [tag],
    })(resourceId, resourceType);
  },
);

export const getResourceCommentsCountCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = resourceCommentsTag(resourceId, resourceType);
    return await nextCache(
      getCommentsCount,
      [`commentscount-${resourceType}-${resourceId}`],
      {
        revalidate: 60,
        tags: [tag],
      },
    )(resourceId, resourceType);
  },
);
