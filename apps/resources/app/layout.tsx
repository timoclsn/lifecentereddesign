import { ClerkProvider } from '@clerk/nextjs';
import { StorageProvider } from 'components/StorageProvider/StorageProvider';
import { Container } from 'design-system';
import 'design-system/src/themes/resources.css';
import { Metadata } from 'next';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { description, title } from '../lib/metadata';
import '../lib/polyfills';
import { getBaseUrl } from '../lib/utils/utils';
import '../styles/globals.css';

const sans = DM_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const serif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  metadataBase: new URL(getBaseUrl()),
  description,
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
      <StorageProvider>
        <html
          lang="en"
          className={`${sans.variable} ${serif.variable} min-h-screen`}
        >
          <body className="bg-bg-primary text-text-primary flex min-h-screen flex-col font-sans text-base font-normal">
            <Header />
            <main className="flex-1">
              <Container inset className="space-y-10 sm:space-y-40">
                {children}
              </Container>
            </main>
            <Footer />
          </body>
          <Script data-no-cookie data-api="/_hive" src="/bee.js" />
        </html>
      </StorageProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
