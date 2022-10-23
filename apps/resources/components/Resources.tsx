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
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { ContentType, Resources as TResources } from '../lib/content';
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
    text: 'Communities And Organizations',
    type: 'communityOrOrganization',
  },
  {
    text: 'Examples And Case Studies',
    type: 'exampleOrCaseStudy',
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
type Sort = 'date' | 'title';

interface State {
  filteredType: Filter;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
}

const initalState: State = {
  filteredType: 'all',
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
}

export const Resources = ({ resources }: Props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { filteredType, itemsCount, sort, inContext } = state;
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  // Flag so componets can check if they are rendered in context
  if (!inContext) {
    dispatch({ type: 'IN_CONTEXT' });
  }

  const sortedResources = resources.sort((a, b) => {
    if (sort === 'date') {
      return (
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      );
    } else if (sort === 'title') {
      const itemA = 'title' in a.fields ? a.fields.title : a.fields.name;
      const itemB = 'title' in b.fields ? b.fields.title : b.fields.name;
      return itemA.localeCompare(itemB);
    }
    return 0;
  });

  const filteredResources =
    filteredType === 'all'
      ? sortedResources
      : sortedResources.filter((resource) => resource.type === filteredType);
  const resourcesToDisplay = filteredResources.slice(0, itemsCount);
  const showShowMoreBtn = filteredResources.length > itemsCount;

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
        <ul className="items-center overflow-x-scroll hidden sm:flex">
          {filterList.map((filter, idx) => (
            <li key={idx}>
              <Button
                variant="text"
                selected={filteredType === filter.type}
                onClick={() => filterResources(filter.type)}
              >
                {filter.text}
              </Button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-6">
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
                      {filterList.map((filter) => (
                        <SelectItem value={filter.type}>
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
                    </SelectViewport>
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>
          </div>
          <ul
            className="flex flex-col flex-wrap gap-4 md:flex-row overflow-hidden"
            ref={listRef}
          >
            {resourcesToDisplay.map((ressource) => {
              const component = getCardComponent(ressource);
              return (
                <li key={ressource.id} className="md:w-[calc(50%-0.5rem)]">
                  {component}
                </li>
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
