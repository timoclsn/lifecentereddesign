import type { GetStaticProps } from 'next';

import { Layout } from '../components/Layout';
import { getCO2Consumtion } from '../lib/co2';

export default function Error(props) {
  return (
    <Layout
      co2Consumption={props.co2Consumption}
      title="404 | Fehler"
      slug="404"
    >
      <p>404 – Something went wrong.</p>
    </Layout>
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
