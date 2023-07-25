import {
  Categories,
  LikedResources,
  Resources as ResourcesType,
  Topics,
} from '../../lib/resources';
import { ResourcesFilter } from './ResourcesFilter';
import { ResourcesList } from './ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';
import { ReseourcesFilter } from './page';

type Sort = 'date' | 'title' | 'likes';

interface Props {
  resources: ResourcesType;
  categories: Categories;
  topics: Topics;
  initialSort?: Sort;
  likedResources: LikedResources;
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = ({
  resources,
  categories,
  topics,
  likedResources,
  reseourcesFilter,
}: Props) => {
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
