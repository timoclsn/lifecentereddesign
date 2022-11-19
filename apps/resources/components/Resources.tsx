import { useAutoAnimate } from '@formkit/auto-animate/react';
import { UilAngleDown, UilArrowDown, UilCheck } from '@iconscout/react-unicons';
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
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { ContentType, Resources as TResources } from '../lib/content';
import { useOnScreen } from './useOnScreen';
import { getCardComponent } from './utils';

type FilterList = Array<{
  text: string;
  type: Filter;
}>;

const filterList: FilterList = [
  {
    text: 'All Resources',
    type: 'ALL',
  },
  {
    text: 'Thoughtleaders',
    type: 'THOUGHTLEADER',
  },
  {
    text: 'Books',
    type: 'BOOK',
  },
  {
    text: 'Articles',
    type: 'ARTICLE',
  },
  {
    text: 'Courses',
    type: 'COURSE',
  },
  {
    text: 'Podcasts',
    type: 'PODCAST',
  },
  {
    text: 'Podcast Episodes',
    type: 'PODCASTEPISODE',
  },
  {
    text: 'Videos',
    type: 'VIDEO',
  },
  {
    text: 'Tools',
    type: 'TOOL',
  },
  {
    text: 'Directories',
    type: 'DIRECTORY',
  },
  {
    text: 'Communities',
    type: 'COMMUNITY',
  },
  {
    text: 'Examples',
    type: 'EXAMPLE',
  },
  {
    text: 'Agencies',
    type: 'AGENCY',
  },
  {
    text: 'Slides',
    type: 'SLIDE',
  },
  {
    text: 'Magazines',
    type: 'MAGAZINE',
  },
  {
    text: 'Newsletters',
    type: 'NEWSLETTER',
  },
];

type Filter = ContentType | 'ALL';
type Sort = 'date' | 'title' | 'likes';

interface State {
  filteredType: Filter;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
}

const initalState: State = {
  filteredType: 'ALL',
  itemsCount: 12,
  sort: 'title',
  inContext: false,
};

type Action =
  | { type: 'FILTER'; filterType: Filter }
  | { type: 'SHOW_MORE'; itemsCount: number }
  | { type: 'SORT'; sortBy: Sort }
  | { type: 'IN_CONTEXT' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FILTER':
      return {
        ...state,
        filteredType: action.filterType,
      };
    case 'SHOW_MORE':
      return {
        ...state,
        itemsCount: state.itemsCount + action.itemsCount,
      };
    case 'SORT':
      return {
        ...state,
        sort: action.sortBy,
      };
    case 'IN_CONTEXT':
      return {
        ...state,
        inContext: true,
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
  resources: TResources;
  initialSort?: Sort;
}

export const Resources = ({ resources, initialSort = 'title' }: Props) => {
  initalState.sort = initialSort;
  const [state, dispatch] = useReducer(reducer, initalState);
  const { filteredType, itemsCount, sort, inContext } = state;
  const [listRef] = useAutoAnimate<HTMLUListElement>();
  const buttonsRef = useRef<Map<string, HTMLLIElement> | null>(null);
  const filterBtnsRef = useRef<HTMLDivElement>(null);

  const isFilterVisible = useOnScreen(filterBtnsRef);

  // Flag so componets can check if they are rendered in context
  if (!inContext) {
    dispatch({ type: 'IN_CONTEXT' });
  }

  const sortedResources = resources.sort((a, b) => {
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
    filteredType === 'ALL'
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
          <div className="flex flex-col sm:flex-row gap-6 justify-end">
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
