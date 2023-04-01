import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  UilAngleDown,
  UilArrowDown,
  UilCheck,
  UilSearch,
} from '@iconscout/react-unicons';
import {
  Button,
  Heading,
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  Text,
} from 'design-system';
import { matchSorter } from 'match-sorter';
import { useRouter } from 'next/router';
import {
  Dispatch,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import {
  Categories,
  Category,
  ContentType,
  Resources as ResourcesType,
} from '../lib/resources';
import { getCardComponent } from './utils';

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
type Sort = 'date' | 'title' | 'likes';

interface State {
  filteredByType: TypeFilter;
  filteredByCategory: CategoryFilter;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
  searchInput: string;
  searchQuery: string;
}

const initalState: State = {
  filteredByType: 'all',
  filteredByCategory: 'all',
  itemsCount: 12,
  sort: 'title',
  inContext: false,
  searchInput: '',
  searchQuery: '',
};

type Action =
  | { type: 'FILTER_BY_TYPE'; typeIs: TypeFilter }
  | { type: 'FILTER_BY_CATEGORY'; category: CategoryFilter }
  | { type: 'SHOW_MORE'; itemsCount: number }
  | { type: 'SORT'; sortBy: Sort }
  | { type: 'IN_CONTEXT' }
  | { type: 'TYPE_SEARCH'; value: string }
  | { type: 'SEARCH' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FILTER_BY_TYPE':
      const filteredByType =
        action.typeIs === state.filteredByType ? 'all' : action.typeIs;
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
      splitbee.track('Filter resources by category', {
        type: filteredByCategory,
      });
      return {
        ...state,
        filteredByCategory,
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
      return {
        ...state,
        searchQuery: state.searchInput,
      };
    default:
      throw new Error('Unknown action type');
  }
};

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
  initialSort?: Sort;
}

export const Resources = ({
  initialSort = 'title',
  resources,
  categories,
}: Props) => {
  initalState.sort = initialSort;
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    filteredByType,
    filteredByCategory,
    itemsCount,
    sort,
    inContext,
    searchInput,
    searchQuery,
  } = state;

  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const buttonsRef = useRef<Map<string, HTMLLIElement> | null>(null);
  const filterBtnsRef = useRef<HTMLDivElement>(null);
  const isFilterVisible = useOnScreen(filterBtnsRef);

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

  useEffect(() => {
    const scrollToButton = (itemId: string) => {
      const map = getMap();
      const node = map.get(itemId);
      if (node) {
        node.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    };

    if (isFilterVisible) {
      scrollToButton(state.filteredByType);
    }
  }, [isFilterVisible, state.filteredByType]);

  const getMap = () => {
    if (!buttonsRef.current) {
      buttonsRef.current = new Map();
    }
    return buttonsRef.current;
  };

  const showMore = () => {
    dispatch({ type: 'SHOW_MORE', itemsCount: 12 });
  };

  const filterResourcesByType = (type: TypeFilter) =>
    dispatch({ type: 'FILTER_BY_TYPE', typeIs: type });

  const filterResourcesByCategory = (category: CategoryFilter) =>
    dispatch({ type: 'FILTER_BY_CATEGORY', category: category });

  const sortResources = (value: Sort) =>
    dispatch({ type: 'SORT', sortBy: value });

  return (
    <ResourcesContext.Provider value={{ state, dispatch }}>
      <section id="resources" className="flex flex-col gap-10">
        <div>
          <Heading level="1" className="max-w-3x mb-8">
            {title ? title : 'Resources'}
          </Heading>
          <Text as="p" size="large" className="text-text-secondary max-w-5xl">
            Have fun browsing all our resources on Life-centered Design and
            related topics:
          </Text>
        </div>
        <div
          className="bg-bg-primary sticky top-0 z-10 py-4"
          ref={filterBtnsRef}
        >
          <ul className="mb-4 hidden items-center overflow-x-auto sm:flex">
            {typeFilterList.map((filter, idx) => (
              <li
                key={idx}
                ref={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(filter.type, node);
                  } else {
                    map.delete(filter.type);
                  }
                }}
              >
                <Button
                  variant="text"
                  selected={filteredByType === filter.type}
                  onClick={() => {
                    filterResourcesByType(filter.type);
                  }}
                >
                  {filter.text}
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col flex-wrap items-center justify-end gap-6 sm:flex-row">
            <div className="ring-text-secondary focus-within:ring-text-primary flex items-center gap-2 rounded-full bg-transparent px-4 py-1 outline-none ring-2">
              <input
                placeholder="Name, Description…"
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
                className="bg-transparent outline-none"
              />
              <UilSearch className="opacity-60" size="16" />
            </div>

            {/* Filter by type select */}
            <div className="flex gap-4 sm:hidden sm:gap-6">
              <span className="text-text-secondary whitespace-nowrap">
                Type:
              </span>
              <Select
                defaultValue={undefined}
                value={filteredByType}
                onValueChange={(type: TypeFilter) =>
                  filterResourcesByType(type)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                  <SelectIcon>
                    <UilAngleDown />
                  </SelectIcon>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      {typeFilterList.map((filter, idx) => (
                        <SelectItem key={idx} value={filter.type}>
                          <SelectItemIndicator>
                            <UilCheck />
                          </SelectItemIndicator>
                          <SelectItemText>{filter.text}</SelectItemText>
                        </SelectItem>
                      ))}
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            {/* Filter by category select */}
            <div className="flex gap-4 sm:gap-6">
              <span className="text-text-secondary whitespace-nowrap">
                Category:
              </span>
              <Select
                defaultValue={undefined}
                value={filteredByCategory}
                onValueChange={(category: CategoryFilter) =>
                  filterResourcesByCategory(category)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                  <SelectIcon>
                    <UilAngleDown />
                  </SelectIcon>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      <SelectItem key="all" value="all">
                        <SelectItemIndicator>
                          <UilCheck />
                        </SelectItemIndicator>
                        <SelectItemText>All</SelectItemText>
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <SelectItemIndicator>
                            <UilCheck />
                          </SelectItemIndicator>
                          <SelectItemText>{category.name}</SelectItemText>
                        </SelectItem>
                      ))}
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            {/* Sort select */}
            <div className="flex gap-4 sm:gap-6">
              <span className="text-text-secondary whitespace-nowrap">
                Sorted by:
              </span>
              <Select
                defaultValue="date"
                value={sort}
                onValueChange={(value: Sort) => sortResources(value)}
              >
                <SelectTrigger disabled={!!searchQuery}>
                  <SelectValue />
                  <SelectIcon>
                    <UilAngleDown />
                  </SelectIcon>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      <SelectItem value="date">
                        <SelectItemIndicator>
                          <UilCheck />
                        </SelectItemIndicator>
                        <SelectItemText>Date added</SelectItemText>
                      </SelectItem>
                      <SelectItem value="title">
                        <SelectItemIndicator>
                          <UilCheck />
                        </SelectItemIndicator>
                        <SelectItemText>Title</SelectItemText>
                      </SelectItem>
                      <SelectItem value="likes">
                        <SelectItemIndicator>
                          <UilCheck />
                        </SelectItemIndicator>
                        <SelectItemText>Likes</SelectItemText>
                      </SelectItem>
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
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
            <div className="flex items-center justify-center py-16">
              <Heading level="3">No resources found…</Heading>
            </div>
          )}
        </div>
        {showShowMoreBtn && (
          <div className="flex justify-center">
            <Button size="large" onClick={() => showMore()}>
              <UilArrowDown />
              Show More
            </Button>
          </div>
        )}
      </section>
    </ResourcesContext.Provider>
  );
};
