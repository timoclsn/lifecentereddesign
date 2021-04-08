import fetcher from '@/lib/fetcher.js';

const env = process.env.NODE_ENV;

const demoResult = {
    c: 0.11,
    p: 90,
    url: 'https://lifecentereddesign.net'
};

export async function getCO2Consumtion(url) {
    if (env === 'development') {
        return demoResult;
    }

    const result = await fetcher(`https://api.websitecarbon.com/b?url=${url}`);

    if (result.error) {
        console.log(`Website Carbon Error: ${result.error}`);
        return demoResult;
    }

    return result;
}
