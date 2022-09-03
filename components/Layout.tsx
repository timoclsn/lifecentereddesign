import Script from 'next/script';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

import { CenteredColumn } from './CenteredColumn';
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
}

export function Layout({
  children,
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
      <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      <SEO
        title={pageTitle}
        description={pageDescription}
        slug={slug}
        previewImage={pagePreviewImage}
      />
      <Favicons />
      <Suspense fallback={null}>
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
