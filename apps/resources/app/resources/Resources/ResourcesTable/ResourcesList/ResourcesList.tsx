import { getCardComponent } from 'components/utils';
import { Heading } from 'design-system';
import { matchSorter } from 'match-sorter';
import { AutoAnimate } from '../../../../../components/AutoAnimate/AutoAnimate';
import { LikedResources, Resource } from '../../../../../lib/resources';
import { formatType } from '../../../../../lib/utils';
import { ReseourcesFilter } from '../../../page';
import { ClearAllButton } from './ClearAllButton';
import { DownloadButton } from './DownloadButton';
import { ResourcesListTop } from './ResourcesListTop';
import { ShowMoreButton } from './ShowMoreButton';

interface Props {
  resources: Array<Resource>;
  reseourcesFilter: ReseourcesFilter;
  likedResources: LikedResources;
}

export const ResourcesList = ({
  resources,
  reseourcesFilter,
  likedResources,
}: Props) => {
  const limit = reseourcesFilter.limit ?? 10;
  const searchQuery = reseourcesFilter.search ?? '';

  const processedResources = matchSorter(resources, searchQuery, {
    // Search
    keys: [
      'title',
      'name',
      'authors.*.name',
      'authorsPlain',
      'description',
      'creators.*.name',
      'creatorsPlain',
      'hosts.*.name',
      'hostsPlain',
      'podcast.*.title',
      'podcastPlain',
      'guests.*.name',
      'handle',
    ],
  })
    // Sort
    .sort((a, b) => {
      // Don't sort manually when searching
      if (searchQuery) return 0;
      if (!reseourcesFilter.sort || reseourcesFilter.sort === 'date') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (reseourcesFilter.sort === 'title') {
        const itemA = 'title' in a ? a.title : a.name;
        const itemB = 'title' in b ? b.title : b.name;
        return itemA.localeCompare(itemB);
      } else if (reseourcesFilter.sort === 'likes') {
        return b.likes - a.likes;
      }
      return 0;
    })
    // Filter by type
    .filter((resource) => {
      if (!reseourcesFilter.type || reseourcesFilter.type === 'all')
        return true;
      return resource.type === reseourcesFilter.type;
    })
    // Filter by category
    .filter((resource) => {
      if (!reseourcesFilter.category || reseourcesFilter.category === 'all')
        return true;
      return resource.category?.name === reseourcesFilter.category;
    })
    // Filter by topic
    .filter((resource) => {
      if (!reseourcesFilter.topic || reseourcesFilter.topic === 'all')
        return true;
      return resource.topics.some(
        (topic) => topic.name === reseourcesFilter.topic
      );
    })
    // Filter by likes
    .filter((resource) => {
      if (
        !reseourcesFilter.likes ||
        !likedResources ||
        likedResources.length === 0
      ) {
        return true;
      }
      return likedResources.some(
        (likedResources) =>
          likedResources.resourceId === resource.id &&
          likedResources.type === resource.type
      );
    })
    // Filter from
    .filter((resource) => {
      if (!reseourcesFilter.from) return true;
      return (
        new Date(resource.createdAt).getTime() >
        new Date(reseourcesFilter.from).getTime()
      );
    })
    // Filter till
    .filter((resource) => {
      if (!reseourcesFilter.till) return true;
      return (
        new Date(resource.createdAt).getTime() <
        new Date(reseourcesFilter.till).getTime()
      );
    });

  const isFiltered = resources.length !== processedResources.length;
  const resourcesToDisplay = processedResources.slice(0, limit);
  const showShowMoreBtn = processedResources.length > limit;

  const downloadableResources = processedResources.map((resource) => {
    return {
      title: 'title' in resource ? resource.title : resource.name,
      link: resource.link ?? '',
    };
  });
  const downloadableResourcesCsv = convertToCsv(downloadableResources);
  const showDownloadButton = isFiltered && downloadableResources.length > 0;

  return (
    <>
      <div className="flex flex-col gap-6">
        <ResourcesListTop />
        {resourcesToDisplay.length > 0 ? (
          <AutoAnimate
            as="ul"
            className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2"
          >
            {resourcesToDisplay.map((resource) => {
              const component = getCardComponent(resource);
              return (
                <li key={`${resource.type}-${resource.id}`}>{component}</li>
              );
            })}
          </AutoAnimate>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 py-16">
            <Heading level="3">No resources found…</Heading>
            <ClearAllButton />
          </div>
        )}
      </div>
      {(showShowMoreBtn || showDownloadButton) && (
        <div className="mt-10 flex flex-col justify-center gap-4 sm:items-center">
          {showShowMoreBtn && <ShowMoreButton />}
          {showDownloadButton && (
            <DownloadButton csv={downloadableResourcesCsv} />
          )}
        </div>
      )}
    </>
  );
};

const convertToCsv = (
  resources: Array<{
    title: string;
    link: string;
  }>
) => {
  const headers = ['Title', 'Link'];
  const rows = resources.map((resource) => [resource.title, resource.link]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csv;
};
