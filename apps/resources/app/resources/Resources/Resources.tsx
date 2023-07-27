import { Heading, Text, getRandomBackground } from 'design-system';
import { Suspense } from 'react';
import { ReseourcesFilter } from '../page';
import { ResourcesTable } from './ResourcesTable/ResourcesTable';

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
    <div className="space-y-10">
      <div className="rounded-4xl bg-stone h-[100px] w-full animate-pulse" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`rounded-4xl h-[400px] w-full animate-pulse ${getRandomBackground()}`}
            />
          ))}
      </div>
    </div>
  );
};
