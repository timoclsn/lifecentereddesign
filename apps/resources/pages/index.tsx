import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { trpc } from 'utils/trpc';
import { Header } from '../components/Header/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources/NewResources';
import { Newsletter } from '../components/Newsletter/Newsletter';
import { Resources } from '../components/Resources';

export default function Home({
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: resources } = trpc.resources.get.useQuery(undefined, {
    enabled: false,
  });

  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      {resources && <NewResources resources={resources} />}
      <Newsletter />
      {resources && <Resources resources={resources} />}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  await ssg.resources.get.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
      co2Consumption,
    },
    revalidate: 3600, // 1h in seconds
  };
};
