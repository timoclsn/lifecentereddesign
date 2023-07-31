import { getRandomBackground } from 'design-system';
import { Metadata } from 'next';
import { unstable_cache as cache } from 'next/cache';
import { Suspense } from 'react';
import { Newsletter } from '../../../components/Newsletter/Newsletter';
import { getCardComponent } from '../../../components/utils';
import { ContentType, getResource } from '../../../lib/resources';

export const metadata: Metadata = {
  title: 'Resource',
};

interface Props {
  params: {
    slug: string;
  };
}

const ResourcePage = async ({ params }: Props) => {
  const { slug } = params;

  const resourceType = slug.split('-')[0] as ContentType;
  const resourceId = parseInt(slug.split('-')[1]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ResourceCard resourceId={resourceId} resourceType={resourceType} />
      </Suspense>
      <Newsletter />
    </>
  );
};

const Loading = () => {
  return (
    <div
      className={`rounded-4xl h-[400px] w-full animate-pulse ${getRandomBackground()}`}
    />
  );
};

interface ResourceCardProps {
  resourceId: number;
  resourceType: ContentType;
}

const ResourceCard = async ({
  resourceId,
  resourceType,
}: ResourceCardProps) => {
  const tag = `resource-${resourceType}-${resourceId}`;
  const resource = await cache(getResource, [tag], {
    revalidate: 60,
    tags: [tag],
  })(resourceId, resourceType);

  return getCardComponent(resource);
};

export default ResourcePage;
