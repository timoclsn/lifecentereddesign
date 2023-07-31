import { ClerkProvider } from '@clerk/nextjs';
import '@fontsource-variable/source-serif-4';
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/400-italic.css';
import '@fontsource/dm-sans/700.css';
import { Container } from 'design-system';
import 'design-system/src/themes/resources.css';
import { Metadata } from 'next';
import Script from 'next/script';
import { ReactNode, Suspense } from 'react';
import '../styles/globals.css';
import { CO2Badge } from '../components/CO2Badge/CO2Badge';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';

export const runtime = 'edge';

const title = 'LifeCenteredDesign.Net';
const description =
  'A curated directory of resources around Life-centered Design and related fields.';

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description:
    'A curated directory of resources around Life-centered Design and related fields.',
  icons: '/favicon.png',
  openGraph: {
    type: 'website',
    title,
    url: '/',
    siteName: title,
    description,
    images: {
      url: '/og-image.png',
      alt: title,
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@KatharinaClasen',
    creator: '@KatharinaClasen',
  },
  robots: {
    follow: true,
    index: true,
  },
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <html lang="en" className="min-h-screen">
        <body className="bg-bg-primary text-text-primary min-h-screen font-sans text-base font-normal">
          <div className="flex min-h-screen flex-col space-y-20 sm:space-y-40">
            <div>
              <div className="flex justify-center">
                <CO2Badge />
              </div>
              <Navigation />
            </div>
            <Suspense>
              <main className="flex-1">
                <Container inset className="space-y-10 sm:space-y-40">
                  {children}
                </Container>
              </main>
            </Suspense>
            <Footer />
          </div>
        </body>
        <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
