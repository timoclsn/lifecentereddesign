import '@fontsource/dm-sans/400-italic.css';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/source-serif-4/variable.css';
import 'design-system/src/themes/resources.css';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default trpc.withTRPC(MyApp);
