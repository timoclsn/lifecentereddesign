import { Heading, Text } from 'design-system';
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
      return `New resources added between ${formateDate(
        from,
      )} and ${formateDate(till)}:`;
    }

    if (from) {
      return `New resources added after ${formateDate(from)}:`;
    }

    if (till) {
      return `New resources added before ${formateDate(till)}:`;
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
      <ResourcesTable reseourcesFilter={resourcesFilter} />
    </section>
  );
};
