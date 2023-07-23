import { auth } from '@clerk/nextjs';
import { ResourcesTable } from 'components/ResourcesTable';
import { Heading, Text } from 'design-system';
import {
  getCategories,
  getLikedResources,
  getResources,
  getTopics,
} from 'lib/resources';
import { Suspense } from 'react';

export const Resources = async () => {
  const { userId } = auth();
  const [resources, categories, topics, likedResources] = await Promise.all([
    getResources(),
    getCategories(),
    getTopics(),
    getLikedResources(userId ?? ''),
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
        <Suspense fallback={<Loading />}>
          <ResourcesTable
            initialSort="date"
            resources={resources}
            categories={categories}
            topics={topics}
            likedResources={likedResources}
          />
        </Suspense>
      </div>
    </section>
  );
};

const Loading = () => {
  return <div>Loading…</div>;
};
