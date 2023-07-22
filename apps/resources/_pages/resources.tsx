import { Layout } from 'components/Layout';
import { Suggestion } from 'components/Suggestion';
import { getCategories, getResources, getTopics } from 'lib/resources';
import { InferGetStaticPropsType } from 'next';
import { Resources } from '../components/Resources';

const ResourcesPage = ({
  resources,
  categories,
  topics,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Resources" slug="resources">
      <Resources
        initialSort="date"
        resources={resources}
        categories={categories}
        topics={topics}
      />
      <Suggestion />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const resources = await getResources();
  const categories = await getCategories();
  const topics = await getTopics();

  return {
    props: {
      resources,
      categories,
      topics,
    },
    revalidate: 60, // 1m in seconds
  };
};

export default ResourcesPage;
