export const cacheTags = {
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
};
