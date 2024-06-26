import { query } from '@/api/query';
import { MetadataRoute } from 'next';

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

  const { resources } = await query.resources.getResources({});

  resources.forEach((resource) => {
    pages.push({
      url: `https://lifecentereddesign.net/resources/${resource.slug}`,
      lastModified: new Date(),
    });
  });

  return pages;
};

export default sitemap;
