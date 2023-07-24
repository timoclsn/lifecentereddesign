import { auth } from '@clerk/nextjs';
import { ResourcesTable } from 'app/resources/ResourcesTable';
import { Heading, Text } from 'design-system';
import {
  getCategories,
  getLikedResources,
  getResources,
  getTopics,
} from 'lib/resources';
import { unstable_cache as cache } from 'next/cache';
import { ReseourcesFilter } from './page';

interface Props {
  resourcesFilter: ReseourcesFilter;
}

export const Resources = async ({ resourcesFilter }: Props) => {
  const { userId } = auth();
  const [resources, categories, topics, likedResources] = await Promise.all([
    cache(getResources, undefined, { revalidate: 60 })(),
    cache(getCategories, undefined, { revalidate: 60 })(),
    cache(getTopics, undefined, { revalidate: 60 })(),
    cache(getLikedResources, undefined, { revalidate: 60 })(userId ?? ''),
  ]);
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
      <ResourcesTable
        initialSort="date"
        resources={resources}
        categories={categories}
        topics={topics}
        likedResources={likedResources}
        reseourcesFilter={resourcesFilter}
      />
    </section>
  );
};
