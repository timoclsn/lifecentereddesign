const withTM = require('next-transpile-modules')(['design-system']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withTM(nextConfig);
