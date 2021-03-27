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
            <div className="space-y-20 sm:space-y-28">
                <Navigation co2Consumption={co2Consumption} />
                <CenteredColumn>
                    <main className="space-y-20 sm:space-y-28">{children}</main>
                </CenteredColumn>
                <Footer />
            </div>
        </>
    );
}
