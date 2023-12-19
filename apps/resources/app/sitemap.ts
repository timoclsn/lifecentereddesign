import { MetadataRoute } from 'next';
import { featureFlags } from 'lib/featureFlags';
import { query } from 'api/query';

export const dynamic = 'force-dynamic';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const pages = [
    {
      url: 'https://lifecentereddesign.net',
      lastModified: new Date(),
    },
    {
      url: 'https://lifecentereddesign.net/resources',
      lastModified: new Date(),
    },
    {
      url: 'https://lifecentereddesign.net/imprint',
      lastModified: new Date(),
    },
    {
      url: 'https://lifecentereddesign.net/privacy',
      lastModified: new Date(),
    },
    {
      url: 'https://lifecentereddesign.net/sign-in',
      lastModified: new Date(),
    },
    {
      url: 'https://lifecentereddesign.net/sign-up',
      lastModified: new Date(),
    },
  ];

  const resources = await query.resources.getResources();

  resources.forEach((resource) => {
    pages.push({
      url: `https://lifecentereddesign.net/resources/${resource.type}-${resource.id}`,
      lastModified: new Date(),
    });
  });

  const flags = await featureFlags();

  if (flags.collections) {
    pages.push({
      url: 'https://lifecentereddesign.net/collections',
      lastModified: new Date(),
    });

    const collections = await query.collections.getCollections();

    collections.forEach((collection) => {
      pages.push({
        url: `https://lifecentereddesign.net/collections/${collection.id}`,
        lastModified: new Date(),
      });
    });
  }

  return pages;
};

export default sitemap;
