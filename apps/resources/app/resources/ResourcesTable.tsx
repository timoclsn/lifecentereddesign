import { auth } from '@clerk/nextjs';
import {
  getCategories,
  getLikedResources,
  getResources,
  getTopics,
} from 'lib/resources';
import { unstable_cache as cache } from 'next/cache';
import { ResourcesFilter } from './ResourcesFilter';
import { ResourcesList } from './ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';
import { ReseourcesFilter } from './page';

interface Props {
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = async ({ reseourcesFilter }: Props) => {
  const { userId } = auth();
  const [resources, categories, topics, likedResources] = await Promise.all([
    cache(getResources, undefined, { revalidate: 60, tags: ['resources'] })(),
    cache(getCategories, undefined, { revalidate: 60, tags: ['categroies'] })(),
    cache(getTopics, undefined, { revalidate: 60, tags: ['topics'] })(),
    cache(getLikedResources, undefined, {
      revalidate: 60,
      tags: ['liked-resources'],
    })(userId ?? ''),
  ]);

  return (
    <ResourcesTableProvider>
      <div>
        <ResourcesFilter
          topics={topics}
          categories={categories}
          likedResources={likedResources}
        />
        <ResourcesList
          resources={resources}
          reseourcesFilter={reseourcesFilter}
          likedResources={likedResources}
        />
      </div>
    </ResourcesTableProvider>
  );
};
