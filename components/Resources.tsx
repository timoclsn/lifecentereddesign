import {
  UilArrowCircleDown,
  UilAngleDown,
  UilCheck,
} from '@iconscout/react-unicons';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Resources as TResources, ContenType } from '../lib/content';
import { Button } from './Button';
import { FilterButton } from './FilterButton';
import { getCardComponent } from './utils';

type Filter = ContenType | null;
type Sort = 'date' | 'title';

interface Props {
  resources: TResources;
}

export const Resources = ({ resources }: Props) => {
  const [filteredType, setFilteredType] = useState<Filter>(null);
  const [itemsCount, setItemsCount] = useState(12);
  const [sort, setSort] = useState<Sort>('title');

  const sortedResources = resources.sort((a, b) => {
    if (sort === 'date') {
      return (
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
      );
    } else if (sort === 'title') {
      const itemA = 'Title' in a ? a.Title : a.Name;
      const itemB = 'Title' in b ? b.Title : b.Name;
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
    setItemsCount(itemsCount + 12);
  };

  const filterResources = (type: Filter) => setFilteredType(type);

  return (
    <section id="resources" className="flex flex-col gap-20">
      <div className="flex items-center gap-6 overflow-x-scroll">
        <FilterButton
          selected={filteredType === null}
          onClick={() => filterResources(null)}
        >
          All resources
        </FilterButton>
        <FilterButton
          variant="evening"
          selected={filteredType === 'thoughtleader'}
          onClick={() => filterResources('thoughtleader')}
        >
          Thoughtleaders
        </FilterButton>
        <FilterButton
          variant="oak"
          selected={filteredType === 'book'}
          onClick={() => filterResources('book')}
        >
          Books
        </FilterButton>
        <FilterButton
          variant="forest"
          selected={filteredType === 'article'}
          onClick={() => filterResources('article')}
        >
          Articles
        </FilterButton>
        <FilterButton
          variant="evening"
          selected={filteredType === 'course'}
          onClick={() => filterResources('course')}
        >
          Courses
        </FilterButton>
        <FilterButton
          variant="sky"
          selected={filteredType === 'podcast'}
          onClick={() => filterResources('podcast')}
        >
          Podcasts
        </FilterButton>
        <FilterButton
          variant="sand"
          selected={filteredType === 'podcastEpisode'}
          onClick={() => filterResources('podcastEpisode')}
        >
          PodcastEpisodes
        </FilterButton>
        <FilterButton
          variant="grass"
          selected={filteredType === 'video'}
          onClick={() => filterResources('video')}
        >
          Videos
        </FilterButton>
        <FilterButton
          variant="stone"
          selected={filteredType === 'tool'}
          onClick={() => filterResources('tool')}
        >
          Tools
        </FilterButton>
        <FilterButton
          variant="oak"
          selected={filteredType === 'directory'}
          onClick={() => filterResources('directory')}
        >
          Directories
        </FilterButton>
        <FilterButton
          variant="morning"
          selected={filteredType === 'communityOrOrganization'}
          onClick={() => filterResources('communityOrOrganization')}
        >
          CommunitiesAndOrganization
        </FilterButton>
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative self-end">
          <span className="absolute right-24 whitespace-nowrap">
            Sorted by:
          </span>
          <Select.Root
            defaultValue="date"
            value={sort}
            onValueChange={(value: Sort) => setSort(value)}
          >
            <Select.Trigger className="flex items-center gap-1 font-bold outline-none">
              <Select.Value aria-label={sort} />
              <Select.Icon>
                <UilAngleDown />
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className="rounded-2xl bg-black px-4 py-6 text-white">
              <Select.Viewport className="flex flex-col gap-1">
                <Select.Item
                  value="date"
                  className="rounded-lg py-1 pl-[29px] pr-2 outline-none hover:bg-white hover:text-black"
                >
                  <Select.ItemIndicator className="absolute left-1 w-[25px]">
                    <UilCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText>Date</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="title"
                  className="rounded-lg py-1 pl-[29px] pr-2 outline-none hover:bg-white hover:text-black"
                >
                  <Select.ItemIndicator className="absolute left-1 w-[25px]">
                    <UilCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText>Title</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
        <ul className="flex flex-col flex-wrap gap-10 md:flex-row">
          {resourcesToDisplay.map((ressource) => {
            const component = getCardComponent(ressource);
            return (
              <li key={ressource.id} className="md:w-[calc(50%-1.25rem)]">
                {component}
              </li>
            );
          })}
        </ul>
      </div>
      {showShowMoreBtn && (
        <div className="flex justify-center">
          <Button size="l" onClick={() => showMore()}>
            <UilArrowCircleDown />
            Show More
          </Button>
        </div>
      )}
    </section>
  );
};
