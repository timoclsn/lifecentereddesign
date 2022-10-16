const withTM = require('next-transpile-modules')(['design-system']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    scrollRestoration: true,
  },
};

module.exports = withTM(nextConfig);
