import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { About } from 'components/About';
import { allPages } from 'contentlayer/generated';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { Header } from '../components/Header/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources/NewResources';
import { Newsletter } from '../components/Newsletter/Newsletter';

export default function Home({
  co2Consumption,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <NewResources />
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

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await ssg.resources.list.prefetch({ sort: 'date', limit: 10 });

  return {
    props: {
      content,
      trpcState: ssg.dehydrate(),
      co2Consumption,
    },
    revalidate: 3600, // 1h in seconds
  };
};
