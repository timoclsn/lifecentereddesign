import { Heading, Text, getRandomBackground } from 'design-system';
import { Suspense } from 'react';
import { formateDate } from '../../../lib/utils';
import { ReseourcesFilter } from '../page';
import { ResourcesTable } from './ResourcesTable/ResourcesTable';

interface Props {
  resourcesFilter: ReseourcesFilter;
}

export const Resources = async ({ resourcesFilter }: Props) => {
  const title = resourcesFilter.title;
  const from = resourcesFilter.from;
  const till = resourcesFilter.till;

  const description = () => {
    if (from && till) {
      return `New resourcse added between ${formateDate(
        from
      )} and ${formateDate(till)}:`;
    }

    if (from) {
      return `New resourcse added after ${formateDate(from)}:`;
    }

    if (till) {
      return `New resourcse added before ${formateDate(till)}:`;
    }

    return 'Have fun browsing all our resources on Life-centered Design and related topics:';
  };

  return (
    <section id="resources" className="flex flex-col gap-10">
      <div>
        <Heading level="1" className="mb-8 max-w-3xl">
          {title ? title : 'Resources'}
        </Heading>
        <Text as="p" size="large" className="text-text-secondary max-w-5xl">
          {description()}
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
      <div className="bg-stone h-[100px] w-full animate-pulse" />
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
