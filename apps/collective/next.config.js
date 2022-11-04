const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    scrollRestoration: true,
    transpilePackages: ['design-system'],
  },
};

module.exports = withContentlayer(nextConfig);
