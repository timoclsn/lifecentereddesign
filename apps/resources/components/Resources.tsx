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

type Filter = ContentType | null;
type Sort = 'date' | 'title';

interface State {
  filteredType: Filter;
  itemsCount: number;
  sort: Sort;
  inContext: boolean;
}

const initalState: State = {
  filteredType: null,
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
    filteredType === null
      ? sortedResources
      : sortedResources.filter((resource) => resource.type === filteredType);
  const resourcesToDisplay = filteredResources.slice(0, itemsCount);
  const showShowMoreBtn = filteredResources.length > itemsCount;

  const showMore = () => {
    dispatch({ type: 'SHOW_MORE', itemsCount: 12 });
  };

  const filterResources = (type: Filter) =>
    dispatch({ type: 'FILTER', filterType: type });

  return (
    <ResourcesContext.Provider value={{ state, dispatch }}>
      <section id="resources" className="flex flex-col gap-10">
        <div className="flex items-center overflow-x-scroll">
          <Button
            variant="text"
            selected={filteredType === null}
            onClick={() => filterResources(null)}
          >
            All Resources
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'thoughtleader'}
            onClick={() => filterResources('thoughtleader')}
          >
            Thoughtleaders
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'book'}
            onClick={() => filterResources('book')}
          >
            Books
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'article'}
            onClick={() => filterResources('article')}
          >
            Articles
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'course'}
            onClick={() => filterResources('course')}
          >
            Courses
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'podcast'}
            onClick={() => filterResources('podcast')}
          >
            Podcasts
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'podcastEpisode'}
            onClick={() => filterResources('podcastEpisode')}
          >
            Podcast Episodes
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'video'}
            onClick={() => filterResources('video')}
          >
            Videos
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'tool'}
            onClick={() => filterResources('tool')}
          >
            Tools
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'directory'}
            onClick={() => filterResources('directory')}
          >
            Directories
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'communityOrOrganization'}
            onClick={() => filterResources('communityOrOrganization')}
          >
            Communities And Organizations
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'exampleOrCaseStudy'}
            onClick={() => filterResources('exampleOrCaseStudy')}
          >
            Examples And Case Studies
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'agency'}
            onClick={() => filterResources('agency')}
          >
            Agencies
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'slide'}
            onClick={() => filterResources('slide')}
          >
            Slides
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'magazine'}
            onClick={() => filterResources('magazine')}
          >
            Magazines
          </Button>
          <Button
            variant="text"
            selected={filteredType === 'newsletter'}
            onClick={() => filterResources('newsletter')}
          >
            Newsletters
          </Button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6 self-end">
            <span className="whitespace-nowrap text-text-secondary">
              Sorted by:
            </span>
            <Select
              defaultValue="date"
              value={sort}
              onValueChange={(value: Sort) =>
                dispatch({ type: 'SORT', sortBy: value })
              }
            >
              <SelectTrigger>
                <SelectValue aria-label={sort} />
                <SelectIcon>
                  <div className="text-text-secondary">
                    <UilAngleDown />
                  </div>
                </SelectIcon>
              </SelectTrigger>

              <SelectPortal>
                <SelectContent>
                  <SelectViewport>
                    <SelectItem value="date">
                      <SelectItemIndicator>
                        <UilCheck />
                      </SelectItemIndicator>
                      <SelectItemText>
                        <span className="whitespace-nowrap">Date added</span>
                      </SelectItemText>
                    </SelectItem>
                    <SelectItem
                      value="title"
                      className="cursor-pointer rounded-lg py-1 pl-[29px] pr-2 outline-none hover:bg-primary-contrast-text hover:text-primary-main-bg"
                    >
                      <SelectItemIndicator className="absolute left-1 w-[25px]">
                        <UilCheck />
                      </SelectItemIndicator>
                      <SelectItemText>
                        <span className="whitespace-nowrap">Title</span>
                      </SelectItemText>
                    </SelectItem>
                  </SelectViewport>
                </SelectContent>
              </SelectPortal>
            </Select>
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
