import { Card, getRandomCardVariant } from 'design-system';
import { AlertTriangle } from 'lucide-react';
import { getResourceCached } from '../../lib/cache';
import { ContentType } from '../../lib/resources';
import { Await } from '../Await/Await';
import { getCardComponent } from '../utils';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const ResourceCard = ({ resourceId, resourceType }: Props) => {
  const resource = getResourceCached(resourceId, resourceType);
  return (
    <section>
      <Await promise={resource} loading={<Loading />} error={<Error />}>
        {(resource) => <>{getCardComponent(resource)}</>}
      </Await>
    </section>
  );
};

const Loading = () => {
  return (
    <Card
      variant={getRandomCardVariant()}
      className="h-[400px] animate-pulse"
    />
  );
};

const Error = () => {
  return (
    <Card
      variant="error"
      className="flex h-[400px] items-center justify-center gap-2 text-xl text-white"
    >
      <AlertTriangle />
      Error loading resource. Please try again…
    </Card>
  );
};
