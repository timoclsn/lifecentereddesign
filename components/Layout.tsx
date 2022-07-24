import Head from 'next/head';
import Script from 'next/script';
import type { ReactNode } from 'react';

import type { CO2 } from '../lib/co2';
import { CenteredColumn } from './CenteredColumn';
import { Favicons } from './Favicons';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { SEO } from './SEO';

interface Props {
  children: ReactNode;
  co2Consumption: CO2;
  title?: string;
  description?: string;
  slug?: string;
  previewImage?: string;
}

export function Layout({
  children,
  co2Consumption,
  title,
  description,
  slug,
  previewImage,
}: Props) {
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
      </Head>
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <SEO
        title={pageTitle}
        description={pageDescription}
        slug={slug}
        previewImage={pagePreviewImage}
      />
      <Favicons />
      <div className="space-y-20 sm:space-y-40">
        <Navigation co2Consumption={co2Consumption} />
        <CenteredColumn>
          <main className="space-y-10 sm:space-y-20">{children}</main>
        </CenteredColumn>
        <Footer />
      </div>
    </>
  );
}
