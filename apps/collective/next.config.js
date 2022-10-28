const withTM = require('next-transpile-modules')(['design-system']);
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = withContentlayer(withTM(nextConfig));
