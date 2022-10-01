import { InferGetStaticPropsType } from 'next';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources';
import { Newsletter } from '../components/Newsletter';
import { Resources } from '../components/Resources';
import { getAllResources } from '../lib/content';

export default function Home({
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Header />
      <NewResources resources={resources} />
      <Newsletter />
      <Resources resources={resources} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const resources = await getAllResources();

  return {
    props: {
      resources,
    },
  };
};
