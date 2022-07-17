import { UilArrowCircleDown } from '@iconscout/react-unicons';
import { useState } from 'react';
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
  Ressources as TRessources,
} from '../lib/content';
import { ArticleCard } from './ArticleCard';
import { BookCard } from './BookCard';
import { Button } from './Button';
import { CommunityOrOranizationCard } from './CommunityOrOranizationCard';
import { CourseCard } from './CourseCard';
import { DirectoryCard } from './DirectoryCard';
import { PodcastCard } from './PodcastCard';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';
import { ThoughtleaderCard } from './ThoughtleaderCard';
import { ToolCard } from './ToolCard';
import { VideoCard } from './VideoCard';
interface Props {
  ressources: TRessources;
}

export const Ressources = ({ ressources }: Props) => {
  const [itemsCount, setItemsCount] = useState(12);
  const ressourcesToDisplay = ressources.slice(0, itemsCount);
  const showShowMoreBtn = ressources.length > itemsCount;

  const showMore = () => {
    setItemsCount(itemsCount + 12);
  };

  return (
    <div className="flex flex-col gap-20">
      <ul className="flex flex-col flex-wrap gap-10 md:flex-row">
        {ressourcesToDisplay.map((ressource) => {
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
