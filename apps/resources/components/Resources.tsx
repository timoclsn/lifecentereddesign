import { useAutoAnimate } from '@formkit/auto-animate/react';
import {
  UilAngleDown,
  UilArrowDown,
  UilCheck,
  UilSearch,
} from '@iconscout/react-unicons';
import {
  Button,
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
} from 'design-system';
import { matchSorter } from 'match-sorter';
import {
  createContext,
  Dispatch,
  startTransition,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { trpc } from 'utils/trpc';
import { ContentType, QueryFilter } from '../lib/content';
import { useOnScreen } from './useOnScreen';
import { getCardComponent } from './utils';

type FilterList = Array<{
  text: string;
  type: Filter;
}>;

const filterList: FilterList = [
  {
    text: 'All Resources',
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
];

type Filter = ContentType | 'all';
type Sort = 'date' | 'title' | 'likes';

interface State {
  filteredType: Filter;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
  searchInput: string;
  searchQuery: string;
}

const initalState: State = {
  filteredType: 'all',
  itemsCount: 12,
  sort: 'title',
  inContext: false,
  searchInput: '',
  searchQuery: '',
};

type Action =
  | { type: 'FILTER'; filterType: Filter }
  | { type: 'SHOW_MORE'; itemsCount: number }
  | { type: 'SORT'; sortBy: Sort }
  | { type: 'IN_CONTEXT' }
  | { type: 'TYPE_SEARCH'; value: string }
  | { type: 'SEARCH' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FILTER':
      splitbee.track('Filter resources', {
        type: action.filterType,
      });
      return {
        ...state,
        filteredType: action.filterType,
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
  filter: QueryFilter;
  initialSort?: Sort;
}

export const Resources = ({ initialSort = 'title', filter }: Props) => {
  initalState.sort = initialSort;
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    filteredType,
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

  const { data } = trpc.resources.list.useQuery(filter, {
    enabled: false,
  });

  const resources = data || [];

  // Flag so componets can check if they are rendered in context
  if (!inContext) {
    dispatch({ type: 'IN_CONTEXT' });
  }

  const searchedResources = matchSorter(resources, searchQuery, {
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
    ],
  });

  const sortedResources = searchedResources.sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === 'title') {
      const itemA = 'title' in a ? a.title : a.name;
      const itemB = 'title' in b ? b.title : b.name;
      return itemA.localeCompare(itemB);
    } else if (sort === 'likes') {
      return b.likes - a.likes;
    }
    return 0;
  });

  const filteredResources =
    filteredType === 'all'
      ? sortedResources
      : sortedResources.filter((resource) => resource.type === filteredType);
  const resourcesToDisplay = filteredResources.slice(0, itemsCount);
  const showShowMoreBtn = filteredResources.length > itemsCount;

  useEffect(() => {
    if (isFilterVisible) {
      scrollToButton(state.filteredType);
    }
  }, [state.filteredType]);

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

  const getMap = () => {
    if (!buttonsRef.current) {
      buttonsRef.current = new Map();
    }
    return buttonsRef.current;
  };

  const showMore = () => {
    dispatch({ type: 'SHOW_MORE', itemsCount: 12 });
  };

  const filterResources = (type: Filter) =>
    dispatch({ type: 'FILTER', filterType: type });

  const sortResources = (value: Sort) =>
    dispatch({ type: 'SORT', sortBy: value });

  return (
    <ResourcesContext.Provider value={{ state, dispatch }}>
      <section id="resources" className="flex flex-col gap-10">
        <div
          className="sticky top-0 bg-bg-primary py-4 z-10"
          ref={filterBtnsRef}
        >
          <ul className="items-center overflow-x-auto hidden sm:flex mb-4">
            {filterList.map((filter, idx) => (
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
                  selected={filteredType === filter.type}
                  onClick={() => {
                    filterResources(filter.type);
                  }}
                >
                  {filter.text}
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-6 justify-end items-center">
            <div className="relative flex items-center">
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
                className="rounded-full bg-transparent ring-2 ring-text-primary px-4 py-2 outline-none focus-visible:ring"
              />
              <div className="absolute top-0 right-0 flex h-full items-center justify-center px-4">
                <UilSearch className="opacity-60" size="16" />
              </div>
            </div>
            {/* Filter select */}
            <div className="flex gap-4 sm:gap-6 sm:hidden">
              <span className="whitespace-nowrap text-text-secondary">
                Filtered by:
              </span>
              <Select
                defaultValue={undefined}
                value={filteredType}
                onValueChange={(type: Filter) => filterResources(type)}
              >
                <SelectTrigger>
                  <SelectValue aria-label={sort} />
                  <SelectIcon>
                    <UilAngleDown />
                  </SelectIcon>
                </SelectTrigger>

                <SelectPortal>
                  <SelectContent>
                    <SelectViewport>
                      {filterList.map((filter, idx) => (
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

            {/* Sort select */}
            <div className="flex gap-4 sm:gap-6">
              <span className="whitespace-nowrap text-text-secondary">
                Sorted by:
              </span>
              <Select
                defaultValue="date"
                value={sort}
                onValueChange={(value: Sort) => sortResources(value)}
              >
                <SelectTrigger>
                  <SelectValue aria-label={sort} />
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
          <ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
            ref={listRef}
          >
            {resourcesToDisplay.map((resource) => {
              const component = getCardComponent(resource);
              return (
                <li key={`${resource.type}-${resource.id}`}>{component}</li>
              );
            })}
          </ul>
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
