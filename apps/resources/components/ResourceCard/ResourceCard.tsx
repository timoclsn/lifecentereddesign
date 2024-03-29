import { query } from 'api/query';
import { ContentType } from 'lib/resources';
import { Card, getRandomCardVariant } from 'design-system';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../Await/Await';
import { getCardComponent } from '../utils';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  showPreview?: boolean;
}

export const ResourceCard = ({
  resourceId,
  resourceType,
  showPreview,
}: Props) => {
  const resource = query.resources.getResource({
    id: resourceId,
    type: resourceType,
  });
  return (
    <section>
      <Await promise={resource} loading={<Loading />} error={<Error />}>
        {(resource) => (
          <>
            {getCardComponent(resource, {
              showPreview,
            })}
          </>
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
