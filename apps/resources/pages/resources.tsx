import { Layout } from 'components/Layout';
import { getCO2Consumtion } from 'lib/co2';
import { getResources } from 'lib/resources';
import { InferGetStaticPropsType } from 'next';
import { Resources } from '../components/Resources';

const ResourcesPage = ({
  co2Consumption,
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Resources" slug="about" co2Consumption={co2Consumption}>
      <Resources initialSort="date" resources={resources} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');
  const resources = await getResources({});

  return {
    props: {
      co2Consumption,
      resources,
    },
    revalidate: 3600, // 1h in seconds
  };
};

export default ResourcesPage;
