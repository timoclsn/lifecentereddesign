import { resource } from '@/db/schema';
import { revalidateTag as nextRevalidateTag } from 'next/cache';

type CacheTags = typeof cacheTags;
type CacheFunction = (...args: any[]) => string;

const cacheTags = {
  all: 'all',
  co2: 'co2',
  types: 'types',
  categories: 'categories',
  topics: 'topics',
  resources: 'resources',
  likedResourcesCount: (userId: string) => `liked-resources-count-${userId}`,
  resourceComments: (resourceId: string) => `comments-${resourceId}`,
  commentedResourcesCount: (userId: string) =>
    `commented-resources-count-${userId}`,
  ogImageLink: (resourceId: string) => `resource-og-image-${resourceId}`,
  resourcesCount: 'resources-count',
} satisfies Record<string, string | CacheFunction>;

export const getTag = <TTagKey extends keyof CacheTags>(
  ...args: CacheTags[TTagKey] extends CacheFunction
    ? [TTagKey: TTagKey, ...Parameters<CacheTags[TTagKey]>]
    : [tagKey: TTagKey]
) => {
  const [tagKey, ...rest] = args;
  const cacheTag = cacheTags[tagKey];

  if (typeof cacheTag === 'string') {
    return cacheTag;
  } else {
    const cacheFunction = cacheTag as CacheFunction;
    return cacheFunction(...rest);
  }
};

export const revalidateTag = <TTagKey extends keyof CacheTags>(
  ...args: CacheTags[TTagKey] extends CacheFunction
    ? [TTagKey: TTagKey, ...Parameters<CacheTags[TTagKey]>]
    : [tagKey: TTagKey]
) => {
  const [tagKey, ...rest] = args;
  const cacheTag = cacheTags[tagKey];

  if (typeof cacheTag === 'string') {
    nextRevalidateTag(cacheTag);
  } else {
    const cacheFunction = cacheTag as CacheFunction;
    nextRevalidateTag(cacheFunction(...rest));
  }
};
