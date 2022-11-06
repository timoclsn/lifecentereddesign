import { Layout } from 'components/Layout';
import { Heading } from 'design-system';
import { IncomingMessage, ServerResponse } from 'http';
import { getCO2Consumtion } from 'lib/co2';
import { getAllResources } from 'lib/content';
import { InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Resources } from '../components/Resources';

const ResourcesPage = ({
  co2Consumption,
  title,
  resources,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Resources" slug="about" co2Consumption={co2Consumption}>
      <div>
        {title && (
          <Heading level="1" className="mb-8 sm:mb-16">
            {title}
          </Heading>
        )}
        <Resources resources={resources} initialSort="date" />
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
  const { title, from, till } = query;

  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');
  const resources = await getAllResources();

  const filteredResources = resources.filter((resource) => {
    // Typeguard params
    if (!from || !till || Array.isArray(from) || Array.isArray(till)) {
      return true;
    }

    const createdTime = new Date(resource.createdTime).getTime();
    const fromTime = new Date(from).getTime();
    const tillTime = new Date(till).getTime();

    // Return true for broken input
    if (!isNaN(createdTime) || !isNaN(fromTime) || !isNaN(tillTime)) {
      return true;
    }

    // Check if resource is within time frame
    if (createdTime > fromTime && createdTime < tillTime) {
      return true;
    } else {
      return false;
    }
  });

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=31536000'
  );

  return {
    props: {
      co2Consumption,
      title: title || '',
      resources: filteredResources,
    },
  };
};

export default ResourcesPage;
