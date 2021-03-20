import fetcher from '@/lib/fetcher.js';

export async function getCO2Consumtion(url) {
    // const websiteCarbon = await fetcher(
    //     `https://api.websitecarbon.com/b?url=${url}`
    // );
    const websiteCarbon = { c: 0.14, p: 88, url: 'https://timoclasen.de' };
    return websiteCarbon.c;
}
