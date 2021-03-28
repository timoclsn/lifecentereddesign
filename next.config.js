module.exports = {
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
            if (isServer) {
                require('./scripts/generate-sitemap');
            }
        }

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/bee.js',
                destination: 'https://cdn.splitbee.io/sb.js'
            },
            {
                source: '/_hive/:slug',
                destination: 'https://hive.splitbee.io/:slug'
            }
        ];
    }
};
