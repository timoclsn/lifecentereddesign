import { query } from 'api/query';
import { Card, getRandomCardVariant } from 'design-system';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../Await/Await';
import { ResourceCard } from '../ResourceCard/ResourceCard';

interface Props {
  id: string;
  showPreview?: boolean;
}

export const ResourceDetailCard = ({ id, showPreview }: Props) => {
  const promise = query.resources.getResource({
    id,
  });

  return (
    <section>
      <Await promise={promise} loading={<Loading />} error={<Error />}>
        {(resource) => (
          <ResourceCard resource={resource} showPreview={showPreview} />
        )}
      </Await>
    </section>
  );
};

const Loading = () => {
  return (
    <Card
      variant={getRandomCardVariant()}
      className="h-[500px] animate-pulse"
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
