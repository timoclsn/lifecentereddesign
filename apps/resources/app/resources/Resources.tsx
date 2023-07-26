import { ResourcesTable } from 'app/resources/ResourcesTable';
import { Heading, Text } from 'design-system';
import { Suspense } from 'react';
import { ReseourcesFilter } from './page';

interface Props {
  resourcesFilter: ReseourcesFilter;
}

export const Resources = async ({ resourcesFilter }: Props) => {
  return (
    <section id="resources" className="flex flex-col gap-10">
      <div>
        <Heading level="1" className="mb-8 max-w-3xl">
          Resources
        </Heading>
        <Text as="p" size="large" className="text-text-secondary max-w-5xl">
          Have fun browsing all our resources on Life-centered Design and
          related topics:
        </Text>
      </div>
      <Suspense fallback={<Loading />}>
        <ResourcesTable reseourcesFilter={resourcesFilter} />
      </Suspense>
    </section>
  );
};

const Loading = () => {
  return (
    <div className="rounded-4xl bg-lime h-[1000px] w-full animate-pulse" />
  );
};
