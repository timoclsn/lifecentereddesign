const withTM = require('next-transpile-modules')(['design-system']);
const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    scrollRestoration: true,
    newNextLinkBehavior: true,
  },
};

module.exports = withContentlayer(withTM(nextConfig));
