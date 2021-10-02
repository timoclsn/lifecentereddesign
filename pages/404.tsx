import type { GetStaticProps } from 'next';

import { Page } from '../components/Page';
import { getCO2Consumtion } from '../lib/co2';

export default function Error(props) {
  return (
    <Page co2Consumption={props.co2Consumption} title="404 | Fehler" slug="404">
      <p>404 – Something went wrong.</p>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  return {
    props: { co2Consumption },
  };
};
