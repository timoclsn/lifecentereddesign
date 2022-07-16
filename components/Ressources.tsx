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
  return (
    <ul className="flex flex-col flex-wrap gap-10 md:flex-row">
      {ressources.map((ressource) => {
        let component;
        if (ressource.type === 'thoughtleader') {
          component = (
            <ThoughtleaderCard thoughtleader={ressource as Thoughtleader} />
          );
        } else if (ressource.type === 'book') {
          component = <BookCard book={ressource as Book} />;
        } else if (ressource.type === 'article') {
          component = <ArticleCard article={ressource as Article} />;
        } else if (ressource.type === 'course') {
          component = <CourseCard course={ressource as Course} />;
        } else if (ressource.type === 'podcastEpisode') {
          component = (
            <PodcastEpisodeCard podcastEpisode={ressource as PodcastEpisode} />
          );
        } else if (ressource.type === 'podcast') {
          component = <PodcastCard podcast={ressource as Podcast} />;
        } else if (ressource.type === 'video') {
          component = <VideoCard video={ressource as Video} />;
        } else if (ressource.type === 'tool') {
          component = <ToolCard tool={ressource as Tool} />;
        } else if (ressource.type === 'directory') {
          component = <DirectoryCard directory={ressource as Directory} />;
        } else if (ressource.type === 'communityOrOrganization') {
          component = (
            <CommunityOrOranizationCard
              communityOrOrganization={ressource as CommunityOrOrganization}
            />
          );
        } else {
          throw new Error(`Unknown ressource type: ${ressource.type}`);
        }
        return (
          <li key={ressource.id} className="md:w-[calc(50%-1.25rem)]">
            {component}
          </li>
        );
      })}
    </ul>
  );
};
