const { withContentlayer } = require('next-contentlayer');
const withTM = require('next-transpile-modules')(['design-system']);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
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

module.exports = withContentlayer(withTM(config));
