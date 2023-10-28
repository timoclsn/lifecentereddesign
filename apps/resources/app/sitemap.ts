import { MetadataRoute } from 'next';
import { getResources } from '../lib/resources';
import { featureFlags } from 'lib/featureFlags';
import { getCollections } from 'lib/collections';

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

  const resources = await getResources();

  resources.forEach((resource) => {
    pages.push({
      url: `https://lifecentereddesign.net/resources/${resource.id}-${resource.type}`,
      lastModified: new Date(),
    });
  });

  const flags = await featureFlags();

  if (flags.collections) {
    pages.push({
      url: 'https://lifecentereddesign.net/collections',
      lastModified: new Date(),
    });

    const collections = await getCollections();

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
