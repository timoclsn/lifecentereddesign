import { UilArrowDown, UilAngleDown, UilCheck } from '@iconscout/react-unicons';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Resources as TResources, ContentType } from '../lib/content';
import { Button } from './Button';
import { getCardComponent } from './utils';

type Filter = ContentType | null;
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
      const itemA = 'Title' in a.fields ? a.fields.Title : a.fields.Name;
      const itemB = 'Title' in b.fields ? b.fields.Title : b.fields.Name;
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
    <section id="resources" className="flex flex-col gap-10">
      <div className="flex items-center overflow-x-scroll">
        <Button
          variant="text"
          selected={filteredType === null}
          onClick={() => filterResources(null)}
        >
          All resources
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
          Communities And Organization
        </Button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6 self-end">
          <span className="whitespace-nowrap text-text-secondary">
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
                <div className="text-text-secondary">
                  <UilAngleDown />
                </div>
              </Select.Icon>
            </Select.Trigger>

            <Select.Content className="rounded-2xl bg-primary-main-bg px-4 py-6 text-primary-contrast-text">
              <Select.Viewport className="flex flex-col gap-1">
                <Select.Item
                  value="date"
                  className="hover:bg-white hover:text-black rounded-lg py-1 pl-[29px] pr-2 outline-none"
                >
                  <Select.ItemIndicator className="absolute left-1 w-[25px]">
                    <UilCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText>
                    <span className="whitespace-nowrap">Date added</span>
                  </Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="title"
                  className="hover:bg-white hover:text-black rounded-lg py-1 pl-[29px] pr-2 outline-none"
                >
                  <Select.ItemIndicator className="absolute left-1 w-[25px]">
                    <UilCheck />
                  </Select.ItemIndicator>
                  <Select.ItemText>
                    <span className="whitespace-nowrap">Title</span>
                  </Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
        <ul className="flex flex-col flex-wrap gap-4 md:flex-row">
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
  );
};
