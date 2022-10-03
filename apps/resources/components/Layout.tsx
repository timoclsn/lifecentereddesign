import { CenteredColumn } from 'design-system';
import { CO2 } from 'lib/co2';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { CO2Badge } from './CO2Badge';
import { Favicons } from './Favicons';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { SEO } from './SEO';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  slug?: string;
  previewImage?: string;
  co2Consumption?: CO2;
}

export function Layout({
  children,
  title,
  description,
  slug,
  previewImage,
  co2Consumption,
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
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <SEO
        title={pageTitle}
        description={pageDescription}
        slug={slug}
        previewImage={pagePreviewImage}
      />
      <Favicons />
      <Suspense fallback={null}>
        {co2Consumption && (
          <div className="flex justify-center">
            <CO2Badge co2Consumption={co2Consumption} />
          </div>
        )}
        <div className="space-y-20 sm:space-y-40">
          <Navigation />
          <CenteredColumn>
            <main className="space-y-10 sm:space-y-40">{children}</main>
          </CenteredColumn>
          <Footer />
        </div>
      </Suspense>
    </>
  );
}
