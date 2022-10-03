import { CO2Badge } from 'components/CO2Badge';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources';
import { Newsletter } from '../components/Newsletter';
import { Resources } from '../components/Resources';
import { getAllResources } from '../lib/content';

export default function Home({
  resources,
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <NewResources resources={resources} />
      <Newsletter />
      <Resources resources={resources} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const resources = await getAllResources();
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  return {
    props: {
      resources,
      co2Consumption,
    },
  };
};
