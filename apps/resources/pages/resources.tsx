import { Layout } from 'components/Layout';
import { Suggestion } from 'components/Suggestion';
import { getCO2Consumtion } from 'lib/co2';
import { getResources, getCategories } from 'lib/resources';
import { InferGetStaticPropsType } from 'next';
import { Resources } from '../components/Resources';

const ResourcesPage = ({
  co2Consumption,
  resources,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Resources" slug="about" co2Consumption={co2Consumption}>
      <Resources
        initialSort="date"
        resources={resources}
        categories={categories}
      />
      <Suggestion />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');
  const resources = await getResources();
  const categories = await getCategories();

  return {
    props: {
      co2Consumption,
      resources,
      categories,
    },
    revalidate: 3600, // 1h in seconds
  };
};

export default ResourcesPage;
