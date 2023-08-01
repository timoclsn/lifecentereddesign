import { auth } from '@clerk/nextjs';
import { unstable_cache as cache } from 'next/cache';
import {
  getCategories,
  getLikedResources,
  getResourcesCached,
  getTopics,
} from '../../../../lib/resources';
import { ReseourcesFilter } from '../../page';
import { ResourcesFilter } from './ResourcesFilter/ResourcesFilter';
import { ResourcesList } from './ResourcesList/ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';

interface Props {
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = async ({ reseourcesFilter }: Props) => {
  const { userId } = auth();
  const [resources, categories, topics, likedResources] = await Promise.all([
    getResourcesCached(),
    cache(getCategories, ['categroies'], {
      revalidate: 60,
      tags: ['categroies'],
    })(),
    cache(getTopics, ['topics'], { revalidate: 60, tags: ['topics'] })(),
    cache(getLikedResources, ['liked-resources'], {
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
