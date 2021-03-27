import Head from 'next/head';

import CenteredColumn from '@/components/CenteredColumn';
import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';

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
            <Navigation co2Consumption={co2Consumption} />
            <main className="py-16">
                <CenteredColumn>{children}</CenteredColumn>
            </main>
            <Footer />
        </>
    );
}
