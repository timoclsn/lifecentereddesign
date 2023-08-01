import { getRandomBackground } from 'design-system';
import { unstable_cache as nextCache } from 'next/cache';
import { Suspense, cache as reactCache } from 'react';
import { ContentType, getResource } from '../../lib/resources';
import { getCardComponent } from '../utils';

export const getResourceCached = reactCache(
  async (resourceId: number, resourceType: ContentType) => {
    const tag = `resource-${resourceType}-${resourceId}`;
    return await nextCache(getResource, [tag], {
      revalidate: 60,
      tags: [tag],
    })(resourceId, resourceType);
  }
);

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const ResourceCard = ({ resourceId, resourceType }: Props) => {
  return (
    <section>
      <Suspense fallback={<Loading />}>
        <ResourceCardInner
          resourceId={resourceId}
          resourceType={resourceType}
        />
      </Suspense>
    </section>
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

const ResourceCardInner = async ({
  resourceId,
  resourceType,
}: ResourceCardProps) => {
  const resource = await getResourceCached(resourceId, resourceType);
  return getCardComponent(resource);
};
