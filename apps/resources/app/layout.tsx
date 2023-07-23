import '@fontsource-variable/source-serif-4';
import '@fontsource/dm-sans';
import '@fontsource/dm-sans/400-italic.css';
import '@fontsource/dm-sans/700.css';
import 'design-system/src/themes/resources.css';
import { ReactNode } from 'react';
import '../styles/globals.css';
import { CO2Badge } from 'components/CO2Badge/CO2Badge';
import { Navigation } from 'components/Navigation';
import { Container } from 'design-system';
import { Footer } from 'components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import Script from 'next/script';

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="flex min-h-screen flex-col space-y-20 sm:space-y-40">
            <div>
              <div className="flex justify-center">
                <CO2Badge />
              </div>
              <Navigation />
            </div>
            <main className="flex-1">
              <Container inset className="space-y-10 sm:space-y-40">
                {children}
              </Container>
            </main>
            <Footer />
          </div>
        </body>
        <Script data-no-cookie data-api="/_hive" src="/bee.js" />
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
