import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
    },
    sitemap: 'https://lifecentereddesign.net/sitemap.xml',
  };
};

export default robots;
