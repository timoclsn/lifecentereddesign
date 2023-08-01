import { getRandomBackground } from 'design-system';
import { Suspense } from 'react';
import { ContentType, getResourceCached } from '../../lib/resources';
import { getCardComponent } from '../utils';

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
