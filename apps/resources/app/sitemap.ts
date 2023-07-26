import { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
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
};

export default sitemap;
