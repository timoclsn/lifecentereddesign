import { About } from 'components/About';
import { allPages } from 'contentlayer/generated';
import { getCO2Consumtion } from 'lib/co2';
import { getResources } from 'lib/resources';
import { InferGetStaticPropsType } from 'next';
import { Header } from '../components/Header/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources/NewResources';
import { Newsletter } from '../components/Newsletter';

export default function Home({
  co2Consumption,
  content,
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <NewResources resources={resources} />
      <Newsletter />
      <About content={content} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  const content = allPages.find((page) => page.title === 'About');
  if (!content) {
    throw new Error('About content not found');
  }

  const resources = await getResources({ sort: 'date', limit: 10 });

  return {
    props: {
      content,
      co2Consumption,
      resources,
    },
    revalidate: 3600, // 1h in seconds
  };
};
