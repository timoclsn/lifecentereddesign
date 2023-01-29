import { Container } from 'design-system';
import { CO2 } from 'lib/co2';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { CO2Badge } from './CO2Badge/CO2Badge';
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
    : 'A curated directory of resources around Life-centered Design and related fields.';
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
      <div className="min-h-screen space-y-20 sm:space-y-40 flex flex-col">
        <div>
          {co2Consumption && (
            <div className="flex justify-center">
              <CO2Badge co2Consumption={co2Consumption} />
            </div>
          )}
          <Navigation />
        </div>
        <main className="flex-1">
          <Container inset className="space-y-10 sm:space-y-40">
            {children}
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
