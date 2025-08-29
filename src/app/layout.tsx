import { ClerkProvider } from '@clerk/nextjs';
import { StorageProvider } from '@/components/StorageProvider/StorageProvider';
import { Container } from '@/design-system';
import '@/design-system/themes/resources.css';
import { Metadata } from 'next';
import { DM_Sans, Source_Serif_4 } from 'next/font/google';
import { ReactNode } from 'react';
import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import '../lib/env';
import { description, title } from '../lib/metadata';
import '../lib/polyfills';
import { getBaseUrl } from '../lib/utils/utils';
import '../styles/globals.css';
import { Toaster } from '@/ui/toaster';

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
          <body className="flex min-h-screen flex-col bg-bg-primary font-sans text-base font-normal text-text-primary">
            <Header />
            <main className="flex-1">
              <Container inset className="space-y-10 sm:space-y-40">
                {children}
              </Container>
            </main>
            <Footer />
            <Toaster />
          </body>
        </html>
      </StorageProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
