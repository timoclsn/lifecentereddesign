const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['design-system'],
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ];
  },
};

module.exports = withContentlayer(config);
