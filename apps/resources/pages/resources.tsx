import '@tanstack/react-query';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { Layout } from 'components/Layout';
import { Heading } from 'design-system';
import { IncomingMessage, ServerResponse } from 'http';
import { getCO2Consumtion } from 'lib/co2';
import { QueryFilter } from 'lib/resources';
import { InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { appRouter } from 'server/routers/_app';
import superjson from 'superjson';
import { z } from 'zod';
import { Resources } from '../components/Resources';

const ResourcesPage = ({
  co2Consumption,
  title,
  filter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Resources" slug="about" co2Consumption={co2Consumption}>
      <div>
        {title && (
          <Heading level="1" className="mb-8 sm:mb-16">
            {title}
          </Heading>
        )}
        <Resources initialSort="date" filter={filter} />
      </div>
    </Layout>
  );
};

interface GetServerSideProps {
  res: ServerResponse<IncomingMessage>;
  query: ParsedUrlQuery;
}

export const getServerSideProps = async ({
  res,
  query,
}: GetServerSideProps) => {
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson,
  });

  const { title, from, till } = query;

  const filter: QueryFilter = {};

  if (from && !Array.isArray(from)) {
    const parsedFrom = z.date().safeParse(new Date(from));
    if (parsedFrom.success) {
      filter.from = parsedFrom.data;
    }
  }

  if (till && !Array.isArray(till)) {
    const parsedTill = z.date().safeParse(new Date(till));
    if (parsedTill.success) {
      filter.till = parsedTill.data;
    }
  }

  await ssg.resources.list.prefetch(filter);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  return {
    props: {
      co2Consumption,
      title: title || null,
      trpcState: ssg.dehydrate(),
      filter,
    },
  };
};

export default ResourcesPage;
