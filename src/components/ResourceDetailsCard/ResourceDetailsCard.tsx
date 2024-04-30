import { query } from '@/api/query';
import { Card, getRandomCardVariant } from '@/design-system';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../Await/Await';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { EditResourceButton } from '../AddOrEditResource/EditResourceButton';
import { auth } from '@clerk/nextjs/server';

interface Props {
  slug: string;
}

export const ResourceDetailsCard = ({ slug }: Props) => {
  const { userId } = auth();
  const promise = query.resources.getResourceBySlug({
    slug,
  });

  return (
    <section>
      <Await promise={promise} loading={<Loading />} error={<Error />}>
        {(resource) => (
          <>
            <ResourceCard resource={resource} details />
            {userId && <EditResourceButton resource={resource} />}
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
