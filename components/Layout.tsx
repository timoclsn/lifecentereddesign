import React from 'react';
import type { ReactNode } from 'react';

import type { CO2 } from '../lib/co2';
import { Container } from './Container';
import { Favicons } from './Favicons';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { SEO } from './SEO';
import { Stack } from './Stack';

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
      <SEO
        title={pageTitle}
        description={pageDescription}
        slug={slug}
        previewImage={pagePreviewImage}
      />
      <Favicons />
      <Stack space="128px">
        <Navigation co2Consumption={co2Consumption} />
        <Container inset="16px">
          <Stack as="main" space="128px">
            {children}
          </Stack>
        </Container>
        <Footer />
      </Stack>
    </>
  );
}
