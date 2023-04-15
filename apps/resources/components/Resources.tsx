import { useAuth } from '@clerk/nextjs';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  UilArrowDown,
  UilHeart,
  UilSearch,
  UilTimesCircle,
} from '@iconscout/react-unicons';
import * as Toggle from '@radix-ui/react-toggle';
import { cva } from 'class-variance-authority';
import { Button, Heading, Select, Text, Tooltip } from 'design-system';
import { matchSorter } from 'match-sorter';
import { useRouter } from 'next/router';
import {
  Dispatch,
  createContext,
  startTransition,
  useContext,
  useReducer,
  useRef,
} from 'react';
import { trpc } from 'utils/trpc';
import {
  Categories,
  Category,
  ContentType,
  Resources as ResourcesType,
  Topic,
  Topics,
} from '../lib/resources';
import { getCardComponent } from './utils';

const filterByLikesBtnVaraints = cva(
  'flex items-center justify-center ease transition-transform hover:scale-110 active:scale-90',
  {
    variants: {
      active: {
        true: 'text-red-700',
        false: 'text-text-primary',
      },
    },
  }
);

type TypeFilterList = Array<{
  text: string;
  type: TypeFilter;
}>;

const typeFilterList = (
  [
    {
      text: 'All',
      type: 'all',
    },
    {
      text: 'Thoughtleaders',
      type: 'thoughtleader',
    },
    {
      text: 'Books',
      type: 'book',
    },
    {
      text: 'Articles',
      type: 'article',
    },
    {
      text: 'Courses',
      type: 'course',
    },
    {
      text: 'Podcasts',
      type: 'podcast',
    },
    {
      text: 'Podcast Episodes',
      type: 'podcastEpisode',
    },
    {
      text: 'Videos',
      type: 'video',
    },
    {
      text: 'Tools',
      type: 'tool',
    },
    {
      text: 'Directories',
      type: 'directory',
    },
    {
      text: 'Communities',
      type: 'community',
    },
    {
      text: 'Examples',
      type: 'example',
    },
    {
      text: 'Agencies',
      type: 'agency',
    },
    {
      text: 'Slides',
      type: 'slide',
    },
    {
      text: 'Magazines',
      type: 'magazine',
    },
    {
      text: 'Newsletters',
      type: 'newsletter',
    },
    {
      text: 'Papers',
      type: 'paper',
    },
    {
      text: 'Social Media Profiles',
      type: 'socialMediaProfile',
    },
    {
      text: 'Reports',
      type: 'report',
    },
  ] as TypeFilterList
).sort((a, b) => {
  if (a.text === 'All') return -1;
  if (b.text === 'All') return 1;
  return a.text.localeCompare(b.text);
});

type TypeFilter = ContentType | 'all';
type CategoryFilter = Category['name'] | 'all' | undefined;
type TopicFilter = Topic['name'] | 'all' | undefined;
type Sort = 'date' | 'title' | 'likes';

interface State {
  filteredByType: TypeFilter;
  filteredByCategory: CategoryFilter;
  filteredByTopic: TopicFilter;
  filterByLikes: boolean;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
  searchInput: string;
  searchQuery: string;
}

const initalState: State = {
  filteredByType: 'all',
  filteredByCategory: 'all',
  filteredByTopic: 'all',
  filterByLikes: false,
  itemsCount: 12,
  sort: 'date',
  inContext: false,
  searchInput: '',
  searchQuery: '',
};

type Action =
  | { type: 'FILTER_BY_TYPE'; typeIs: TypeFilter }
  | { type: 'FILTER_BY_CATEGORY'; category: CategoryFilter }
  | { type: 'FILTER_BY_TOPIC'; topic: TopicFilter }
  | { type: 'TOGGLE_FILTER_BY_LIKES' }
  | { type: 'SHOW_MORE'; itemsCount: number }
  | { type: 'SORT'; sortBy: Sort }
  | { type: 'IN_CONTEXT' }
  | { type: 'TYPE_SEARCH'; value: string }
  | { type: 'SEARCH' }
  | { type: 'CLEAR_ALL' };

const ResourcesContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initalState,
  dispatch: () => null,
});

export const useResources = () => useContext(ResourcesContext);

interface Props {
  resources: ResourcesType;
  categories: Categories;
  topics: Topics;
  initialSort?: Sort;
}

export const Resources = ({
  initialSort = 'title',
  resources,
  categories,
  topics,
}: Props) => {
  initalState.sort = initialSort;

  const { isSignedIn } = useAuth();
  const { data: likedResources } = trpc.resources.liked.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  const resourcesTopRef = useRef<HTMLDivElement>(null);
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const scrollToTop = () => {
    resourcesTopRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'FILTER_BY_TYPE':
        const filteredByType =
          action.typeIs === state.filteredByType ? 'all' : action.typeIs;
        scrollToTop();
        splitbee.track('Filter resources by type', {
          type: filteredByType,
        });
        return {
          ...state,
          filteredByType,
        };
      case 'FILTER_BY_CATEGORY':
        const filteredByCategory =
          !action.category || action.category === state.filteredByCategory
            ? 'all'
            : action.category;
        scrollToTop();
        splitbee.track('Filter resources by category', {
          category: filteredByCategory,
        });
        return {
          ...state,
          filteredByCategory,
        };
      case 'FILTER_BY_TOPIC':
        const filteredByTopic =
          !action.topic || action.topic === state.filteredByTopic
            ? 'all'
            : action.topic;
        scrollToTop();
        splitbee.track('Filter resources by topic', {
          topic: filteredByTopic,
        });
        return {
          ...state,
          filteredByTopic,
        };
      case 'TOGGLE_FILTER_BY_LIKES':
        scrollToTop();
        splitbee.track('Toggle filter resources by likes');
        return {
          ...state,
          filterByLikes: !state.filterByLikes,
        };
      case 'SHOW_MORE':
        splitbee.track('Show more resources', {
          count: state.itemsCount + action.itemsCount,
        });
        return {
          ...state,
          itemsCount: state.itemsCount + action.itemsCount,
        };
      case 'SORT':
        splitbee.track('Sort resources', { by: action.sortBy });
        return {
          ...state,
          sort: action.sortBy,
        };
      case 'IN_CONTEXT':
        return {
          ...state,
          inContext: true,
        };
      case 'TYPE_SEARCH':
        return {
          ...state,
          searchInput: action.value,
        };
      case 'SEARCH':
        scrollToTop();
        return {
          ...state,
          searchQuery: state.searchInput,
        };
      case 'CLEAR_ALL':
        scrollToTop();
        return {
          ...initalState,
        };
      default:
        throw new Error('Unknown action type');
    }
  };

  const [state, dispatch] = useReducer(reducer, initalState);

  const {
    filteredByType,
    filteredByCategory,
    filteredByTopic,
    filterByLikes,
    itemsCount,
    sort,
    inContext,
    searchInput,
    searchQuery,
  } = state;

  const isFiltered =
    filteredByType !== initalState.filteredByType ||
    filteredByCategory !== initalState.filteredByCategory ||
    filteredByTopic !== initalState.filteredByTopic ||
    filterByLikes !== initalState.filterByLikes ||
    searchQuery !== initalState.searchQuery ||
    sort !== initalState.sort;

  const { query } = useRouter();
  const { title, from, till } = query;
  const fromParsed = Array.isArray(from) ? from[0] : from;
  const tillParsed = Array.isArray(till) ? till.at(0) : till;

  // Flag so componets can check if they are rendered in context
  if (!inContext) {
    dispatch({ type: 'IN_CONTEXT' });
  }

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
      if (sort === 'date') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'title') {
        const itemA = 'title' in a ? a.title : a.name;
        const itemB = 'title' in b ? b.title : b.name;
        return itemA.localeCompare(itemB);
      } else if (sort === 'likes') {
        return b.likes - a.likes;
      }
      return 0;
    })
    // Filter by type
    .filter((resource) => {
      if (filteredByType === 'all') return true;
      return resource.type === filteredByType;
    })
    // Filter by category
    .filter((resource) => {
      if (filteredByCategory === 'all') return true;
      return resource.category?.name === filteredByCategory;
    })
    // Filter by topic
    .filter((resource) => {
      if (filteredByTopic === 'all') return true;
      return resource.topics.some((topic) => topic.name === filteredByTopic);
    })
    // Filter by likes
    .filter((resource) => {
      if (!filterByLikes || !likedResources || likedResources.length === 0) {
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
      if (!fromParsed) return true;
      return resource.createdAt.getTime() > new Date(fromParsed).getTime();
    })
    // Filter till
    .filter((resource) => {
      if (!tillParsed) return true;
      return resource.createdAt.getTime() < new Date(tillParsed).getTime();
    });

  const resourcesToDisplay = processedResources.slice(0, itemsCount);
  const showShowMoreBtn = processedResources.length > itemsCount;

  const showMore = () => dispatch({ type: 'SHOW_MORE', itemsCount: 12 });

  const filterResourcesByType = (type: TypeFilter) =>
    dispatch({ type: 'FILTER_BY_TYPE', typeIs: type });

  const filterResourcesByCategory = (category: CategoryFilter) =>
    dispatch({ type: 'FILTER_BY_CATEGORY', category: category });

  const filterResourcesByTopic = (topic: TopicFilter) =>
    dispatch({ type: 'FILTER_BY_TOPIC', topic: topic });

  const sortResources = (value: Sort) =>
    dispatch({ type: 'SORT', sortBy: value });

  const clearAll = () => dispatch({ type: 'CLEAR_ALL' });

  return (
    <ResourcesContext.Provider value={{ state, dispatch }}>
      <section id="resources" className="flex flex-col gap-10">
        <div>
          <Heading level="1" className="mb-8 max-w-3xl">
            {title ? title : 'Resources'}
          </Heading>
          <Text as="p" size="large" className="text-text-secondary max-w-5xl">
            Have fun browsing all our resources on Life-centered Design and
            related topics:
          </Text>
        </div>
        <div>
          <div className="bg-bg-primary sticky top-0 z-10 flex flex-wrap justify-between gap-3 py-4 sm:py-6">
            <div className="flex flex-1 gap-3 sm:w-auto sm:flex-nowrap">
              {/* Filter by type select */}
              <Select
                defaultValue={undefined}
                value={filteredByType}
                onValueChange={(type: TypeFilter) =>
                  filterResourcesByType(type)
                }
              >
                <Select.FilterTrigger label="Type" />
                <Select.Content>
                  {typeFilterList.map((type, idx) => (
                    <Select.Item key={idx} value={type.type}>
                      {type.text}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>

              {/* Filter by category select */}
              <Select
                defaultValue={undefined}
                value={filteredByCategory}
                onValueChange={(category: CategoryFilter) =>
                  filterResourcesByCategory(category)
                }
              >
                <Select.FilterTrigger label="Category" />
                <Select.Content>
                  <Select.Item key="all" value="all">
                    All
                  </Select.Item>
                  {categories.map((category) => (
                    <Select.Item key={category.id} value={category.name}>
                      {category.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>

              {/* Filter by topic select */}
              <Select
                defaultValue={undefined}
                value={filteredByTopic}
                onValueChange={(topic: TopicFilter) =>
                  filterResourcesByTopic(topic)
                }
              >
                <Select.FilterTrigger label="Topic" />
                <Select.Content>
                  <Select.Item key="all" value="all">
                    All
                  </Select.Item>
                  {topics.map((topic) => (
                    <Select.Item key={topic.id} value={topic.name}>
                      {topic.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="flex flex-wrap gap-3">
              {likedResources && likedResources.length > 0 && (
                <Tooltip
                  content={
                    filterByLikes
                      ? 'Show all resources'
                      : 'Only show liked resources'
                  }
                  delayDuration={500}
                >
                  <Toggle.Root
                    aria-label="Filter by likes"
                    className={filterByLikesBtnVaraints({
                      active: filterByLikes,
                    })}
                    onPressedChange={() =>
                      dispatch({ type: 'TOGGLE_FILTER_BY_LIKES' })
                    }
                  >
                    <UilHeart />
                  </Toggle.Root>
                </Tooltip>
              )}

              {/* Search */}
              <div className="bg-primary-ghost-bg text-text-secondary focus-within:ring-text-secondary flex min-w-[100px] flex-1 items-center gap-2 px-4 py-1 outline-none ring-inset focus-within:ring-2 sm:max-w-[240px]">
                <UilSearch className="flex-none opacity-60" size="16" />
                <input
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => {
                    dispatch({
                      type: 'TYPE_SEARCH',
                      value: e.target.value,
                    });
                    startTransition(() => {
                      dispatch({
                        type: 'SEARCH',
                      });
                    });
                  }}
                  className="text-text-primary w-full bg-transparent outline-none"
                />
              </div>

              {/* Sort select */}
              <Select
                defaultValue="date"
                value={sort}
                onValueChange={(value: Sort) => sortResources(value)}
              >
                <Select.SortTrigger disabled={searchQuery !== ''} />
                <Select.Content>
                  <Select.Item value="date">Date added</Select.Item>
                  <Select.Item value="title">Title</Select.Item>
                  <Select.Item value="likes">Likes</Select.Item>
                </Select.Content>
              </Select>

              <Tooltip content="Clear all filter" delayDuration={500}>
                <button
                  disabled={!isFiltered}
                  onClick={clearAll}
                  className="ease transition-transform hover:scale-110 active:scale-90 disabled:scale-100 disabled:opacity-50"
                >
                  <UilTimesCircle />
                  <span className="sr-only">Clear filters</span>
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div ref={resourcesTopRef} className="scroll-m-20" />
            {resourcesToDisplay.length > 0 ? (
              <ul
                className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2"
                ref={listRef}
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
                <Button variant="outline" onClick={clearAll}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          {showShowMoreBtn && (
            <div className="mt-10 flex justify-center">
              <Button size="large" onClick={() => showMore()}>
                <UilArrowDown />
                Show More
              </Button>
            </div>
          )}
        </div>
      </section>
    </ResourcesContext.Provider>
  );
};
