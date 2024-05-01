import { query } from '@/api/query';
import { Card, InfoBox, getRandomCardVariant } from '@/design-system';
import { isEmpty } from '@/lib/utils/utils';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../../../../components/Await/Await';
import { ReseourcesFilter } from '../Resources';
import { ResourcesFilter } from './ResourcesFilter/ResourcesFilter';
import { ResourcesList } from './ResourcesList/ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';
import { auth } from '@clerk/nextjs/server';
import { AddResourceButton } from '../../../../components/AddOrEditResource/AddResourceButton';

interface Props {
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = ({ reseourcesFilter }: Props) => {
  const {
    limit,
    sort,
    type,
    category,
    topic,
    search,
    liked,
    commented,
    from,
    till,
  } = reseourcesFilter;
  const { userId } = auth();

  const promises = Promise.all([
    query.resources.getResources({
      limit: limit || 10,
      sort: sort ? [sort] : ['date'],
      filter: {
        typeNames: type ? [type] : undefined,
        categoryNames: category ? [category] : undefined,
        topicNames: topic ? [topic] : undefined,
        search,
        liked,
        commented,
        from: from ? new Date(from) : undefined,
        till: till ? new Date(till) : undefined,
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
            {userId && <AddResourceButton />}
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
