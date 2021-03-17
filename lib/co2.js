import fetcher from '@/lib/fetcher.js';

export async function getCO2Consumtion(url) {
    const websiteCarbon = await fetcher(
        `https://api.websitecarbon.com/b?url=${url}`
    );
    return websiteCarbon.c;
}
