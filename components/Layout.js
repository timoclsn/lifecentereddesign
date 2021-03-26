import Head from 'next/head';

import ContentBlock from '@/components/ContentBlock';
import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import Stack from '@/components/Stack';

export default function Layout({ co2Consumption, children }) {
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/fonts/noto-sans-regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/noto-sans-bold.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </Head>
            <SEO />
            <Favicons />
            <Stack space="large">
                <Navigation co2Consumption={co2Consumption} />
                <ContentBlock as="main" paddingX="medium">
                    {children}
                </ContentBlock>
                <Footer />
            </Stack>
        </>
    );
}
