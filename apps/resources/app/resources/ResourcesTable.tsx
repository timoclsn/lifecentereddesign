import { Heading } from 'design-system';
import { matchSorter } from 'match-sorter';
import { getCardComponent } from '../../components/utils';
import {
  Categories,
  LikedResources,
  Resources as ResourcesType,
  Topics,
} from '../../lib/resources';
import { ResourcesFilter } from './ResourcesFilter';
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
  // const resourcesTopRef = useRef<HTMLDivElement>(null);
  // const [listRef] = useAutoAnimate<HTMLUListElement>();

  // const scrollToTop = () => {
  //   resourcesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  const processedResources = matchSorter(
    resources,
    reseourcesFilter.search ?? '',
    {
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
    }
  )
    // Sort
    .sort((a, b) => {
      // Don't sort manually when searching
      if (reseourcesFilter.search) return 0;
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
        resource.createdAt.getTime() > new Date(reseourcesFilter.from).getTime()
      );
    })
    // // Filter till
    .filter((resource) => {
      if (!reseourcesFilter.till) return true;
      return (
        resource.createdAt.getTime() < new Date(reseourcesFilter.till).getTime()
      );
    });

  // const resourcesToDisplay = processedResources.slice(0, itemsCount);
  // const showShowMoreBtn = processedResources.length > itemsCount;

  const resourcesToDisplay = processedResources.slice(0, 10);
  const showShowMoreBtn = false;

  // const showMore = () => dispatch({ type: 'SHOW_MORE', itemsCount: 12 });

  // const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

  return (
    <div>
      <ResourcesFilter
        topics={topics}
        categories={categories}
        likedResources={likedResources}
      />
      <div className="flex flex-col gap-6">
        <div
          // ref={resourcesTopRef}
          className="scroll-m-20"
        />
        {resourcesToDisplay.length > 0 ? (
          <ul
            className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2"
            // ref={listRef}
          >
            {resourcesToDisplay.map((resource) => {
              const component = getCardComponent(resource);
              return (
                <li key={`${resource.type}-${resource.id}`}>{component}</li>
              );
            })}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 py-16">
            <Heading level="3">No resources found…</Heading>
            {/* <Button variant="outline" onClick={clearAll}>
              Clear Filters
            </Button> */}
          </div>
        )}
      </div>
      {showShowMoreBtn && (
        <div className="mt-10 flex justify-center">
          {/* <Button size="large" onClick={() => showMore()}>
            <UilArrowDown />
            Show More
          </Button> */}
        </div>
      )}
    </div>
  );
};
