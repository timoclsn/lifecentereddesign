import '@fontsource/dm-sans';
import '@fontsource/source-serif-4/variable.css';
import 'design-system/src/themes/collective.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
