import { auth } from '@clerk/nextjs/server';
import { Card, InfoBox, getRandomCardVariant } from 'design-system';
import { AlertTriangle } from 'lucide-react';
import { Await } from '../../../../components/Await/Await';
import { ReseourcesFilter } from '../Resources';
import { ResourcesFilter } from './ResourcesFilter/ResourcesFilter';
import { ResourcesList } from './ResourcesList/ResourcesList';
import { ResourcesTableProvider } from './ResourcesTableProvider';
import { query } from 'api/query';

interface Props {
  reseourcesFilter: ReseourcesFilter;
}

export const ResourcesTable = ({ reseourcesFilter }: Props) => {
  const dataPromises = Promise.all([
    query.resources.getResources(),
    query.categories.getCategories(),
    query.topics.getTopics(),
    query.resources.getLikedResources(),
    query.resources.getCommentedResources(),
  ]);

  return (
    <Await promise={dataPromises} loading={<Loading />} error={<Error />}>
      {([
        resources,
        categories,
        topics,
        likedResources,
        commentedResources,
      ]) => (
        <ResourcesTableProvider>
          <div>
            <ResourcesFilter
              topics={topics}
              categories={categories}
              likedResources={likedResources}
              commentedResources={commentedResources}
            />
            <ResourcesList
              resources={resources}
              reseourcesFilter={reseourcesFilter}
              likedResources={likedResources}
              commentedResources={commentedResources}
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
      <div className="bg-stone h-[100px] w-full animate-pulse" />

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
