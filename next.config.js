const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
    },
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
