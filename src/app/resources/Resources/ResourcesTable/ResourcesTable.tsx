import { query } from '@/api/query';
import { Card, InfoBox, getRandomCardVariant } from '@/design-system';
import { isEmpty } from '@/lib/utils/utils';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../../../../components/Await/Await';
import { ReseourcesFilter } from '../Resources';
import { ResourcesFilter } from './ResourcesFilter/ResourcesFilter';
import { ResourcesList } from './ResourcesList/ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';

interface Props {
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = ({ reseourcesFilter }: Props) => {
  const promises = Promise.all([
    query.resources.getResources({
      limit: reseourcesFilter.limit,
      sort: reseourcesFilter.sort ? [reseourcesFilter.sort] : undefined,
      filter: {
        category: reseourcesFilter.category
          ? [reseourcesFilter.category]
          : undefined,
        topic: reseourcesFilter.topic ? [reseourcesFilter.topic] : undefined,
        search: reseourcesFilter.search,
        liked: reseourcesFilter.liked,
        commented: reseourcesFilter.commented,
        from: reseourcesFilter.from
          ? new Date(reseourcesFilter.from)
          : undefined,
        till: reseourcesFilter.till
          ? new Date(reseourcesFilter.till)
          : undefined,
      },
    }),
    query.types.getTypes(),
    query.categories.getCategories(),
    query.topics.getTopics(),
    query.resources.getLikedResourcesCount(),
    query.resources.getCommentedResourcesCount(),
  ]);

  return (
    <Await promise={promises} loading={<Loading />} error={<Error />}>
      {([
        { resources, hasMore },
        types,
        categories,
        topics,
        likedResourcesCount,
        commentedResourcesCount,
      ]) => (
        <ResourcesTableProvider>
          <div>
            <ResourcesFilter
              types={types}
              topics={topics}
              categories={categories}
              likedResourcesCount={likedResourcesCount}
              commentedResourcesCount={commentedResourcesCount}
            />
            <ResourcesList
              resources={resources}
              hasMore={hasMore}
              isFiltered={!isEmpty(reseourcesFilter)}
            />
          </div>
        </ResourcesTableProvider>
      )}
    </Await>
  );
};

const Loading = () => {
  return (
    <div className="space-y-10">
      {/* Filter loading state */}
      <div className="h-[100px] w-full animate-pulse bg-stone" />

      {/* Resources loading state */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Card
              key={index}
              variant={getRandomCardVariant()}
              className="h-[400px] animate-pulse"
            />
          ))}
      </div>
    </div>
  );
};

const Error = () => {
  return (
    <div className="flex justify-center">
      <InfoBox variant="error" icon={<AlertTriangle />}>
        Error loading resources. Please try again…
      </InfoBox>
    </div>
  );
};
