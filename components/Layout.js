import Head from 'next/head';

import CenteredColumn from '@/components/CenteredColumn';
import Favicons from '@/components/Favicons';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';

export default function Layout({
    children,
    co2Consumption,
    title,
    description,
    slug,
    previewImage
}) {
    const defaultTitle = 'Life Centered Design.Net';
    const pageTitle = !title ? defaultTitle : `${title}  |  ${defaultTitle}`;
    const pageDescription = description
        ? description
        : 'A hub for life-centered design: information, news, resources, and conversations to move beyond human-centered and user experience design';
    slug = slug ? `/${slug}` : '';
    const pagePreviewImage = previewImage ? previewImage : 'og-image.png';
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
                <script async data-no-cookie data-api="/_hive" src="/bee.js" />
            </Head>
            <SEO
                title={pageTitle}
                description={pageDescription}
                slug={slug}
                previewImage={pagePreviewImage}
            />
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