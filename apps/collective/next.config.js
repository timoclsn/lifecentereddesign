const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    transpilePackages: ['design-system'],
  },
};

module.exports = withContentlayer(nextConfig);
