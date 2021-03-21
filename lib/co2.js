import fetcher from '@/lib/fetcher.js';

const env = process.env;

export async function getCO2Consumtion(url) {
    if (env === 'development') {
        return { c: 0.14, p: 88, url: 'https://lifecentereddesign.net' };
    }
    const websiteCarbon = await fetcher(
        `https://api.websitecarbon.com/b?url=${url}`
    );
    return websiteCarbon.c;
}
