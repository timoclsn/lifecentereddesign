import { UilArrowCircleDown } from '@iconscout/react-unicons';
import { ReactNode, useState } from 'react';
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

interface Props {
  resources: TResources;
}

type Filter = ContenType | null;

export const Resources = ({ resources }: Props) => {
  const [filteredType, setFilteredType] = useState<Filter>(null);
  const [itemsCount, setItemsCount] = useState(12);

  const filteredResources =
    filteredType === null
      ? resources
      : resources.filter((resource) => resource.type === filteredType);
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
      <ul className="px- text- flex flex-col flex-wrap gap-10 md:flex-row">
        {resourcesToDisplay.map((ressource) => {
          let component;

          switch (ressource.type) {
            case 'thoughtleader':
              component = (
                <ThoughtleaderCard thoughtleader={ressource as Thoughtleader} />
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
              component = <DirectoryCard directory={ressource as Directory} />;
              break;
            case 'communityOrOrganization':
              component = (
                <CommunityOrOranizationCard
                  communityOrOrganization={ressource as CommunityOrOrganization}
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
