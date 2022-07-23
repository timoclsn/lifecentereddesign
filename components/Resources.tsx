import {
  UilArrowCircleDown,
  UilAngleDown,
  UilCheck,
} from '@iconscout/react-unicons';
import { useState } from 'react';
import * as Select from '@radix-ui/react-select';
import {
  Thoughtleader,
  Book,
  Article,
  Course,
  PodcastEpisode,
  Podcast,
  Video,
  Tool,
  Directory,
  CommunityOrOrganization,
  Resources as TResources,
  ContenType,
} from '../lib/content';
import { ArticleCard } from './ArticleCard';
import { BookCard } from './BookCard';
import { Button } from './Button';
import { CommunityOrOranizationCard } from './CommunityOrOranizationCard';
import { CourseCard } from './CourseCard';
import { DirectoryCard } from './DirectoryCard';
import { FilterButton } from './FilterButton';
import { PodcastCard } from './PodcastCard';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';
import { ThoughtleaderCard } from './ThoughtleaderCard';
import { ToolCard } from './ToolCard';
import { VideoCard } from './VideoCard';

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
    <div className="flex flex-col gap-20">
      <div className="flex items-center gap-10 overflow-x-scroll">
        <FilterButton
          size={filteredType === null ? 'l' : 's'}
          onClick={() => filterResources(null)}
        >
          All resources
        </FilterButton>
        <FilterButton
          size={filteredType === 'thoughtleader' ? 'l' : 's'}
          variant="thoughtleader"
          onClick={() => filterResources('thoughtleader')}
        >
          Thoughtleaders
        </FilterButton>
        <FilterButton
          size={filteredType === 'book' ? 'l' : 's'}
          variant="book"
          onClick={() => filterResources('book')}
        >
          Books
        </FilterButton>
        <FilterButton
          size={filteredType === 'article' ? 'l' : 's'}
          variant="article"
          onClick={() => filterResources('article')}
        >
          Articles
        </FilterButton>
        <FilterButton
          size={filteredType === 'course' ? 'l' : 's'}
          variant="course"
          onClick={() => filterResources('course')}
        >
          Courses
        </FilterButton>
        <FilterButton
          size={filteredType === 'podcast' ? 'l' : 's'}
          variant="podcast"
          onClick={() => filterResources('podcast')}
        >
          Podcasts
        </FilterButton>
        <FilterButton
          size={filteredType === 'podcastEpisode' ? 'l' : 's'}
          variant="podcastEpisode"
          onClick={() => filterResources('podcastEpisode')}
        >
          PodcastEpisodes
        </FilterButton>
        <FilterButton
          size={filteredType === 'video' ? 'l' : 's'}
          variant="video"
          onClick={() => filterResources('video')}
        >
          Videos
        </FilterButton>
        <FilterButton
          size={filteredType === 'tool' ? 'l' : 's'}
          variant="tool"
          onClick={() => filterResources('tool')}
        >
          Tools
        </FilterButton>
        <FilterButton
          size={filteredType === 'directory' ? 'l' : 's'}
          variant="directory"
          onClick={() => filterResources('directory')}
        >
          Directories
        </FilterButton>
        <FilterButton
          size={filteredType === 'communityOrOrganization' ? 'l' : 's'}
          variant="communityOrOrganization"
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
            let component;

            switch (ressource.type) {
              case 'thoughtleader':
                component = (
                  <ThoughtleaderCard
                    thoughtleader={ressource as Thoughtleader}
                  />
                );
                break;
              case 'book':
                component = <BookCard book={ressource as Book} />;
                break;
              case 'article':
                component = <ArticleCard article={ressource as Article} />;
                break;
              case 'course':
                component = <CourseCard course={ressource as Course} />;
                break;
              case 'podcast':
                component = <PodcastCard podcast={ressource as Podcast} />;
                break;
              case 'podcastEpisode':
                component = (
                  <PodcastEpisodeCard
                    podcastEpisode={ressource as PodcastEpisode}
                  />
                );
                break;
              case 'video':
                component = <VideoCard video={ressource as Video} />;
                break;
              case 'tool':
                component = <ToolCard tool={ressource as Tool} />;
                break;
              case 'directory':
                component = (
                  <DirectoryCard directory={ressource as Directory} />
                );
                break;
              case 'communityOrOrganization':
                component = (
                  <CommunityOrOranizationCard
                    communityOrOrganization={
                      ressource as CommunityOrOrganization
                    }
                  />
                );
                break;
              default:
                throw new Error(`Unknown ressource type: ${ressource.type}`);
            }

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
          <Button
            size="l"
            text="Show More"
            Icon={UilArrowCircleDown}
            onClick={() => showMore()}
          />
        </div>
      )}
    </div>
  );
};
