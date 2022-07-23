import {
  Thoughtleader,
  Book,
  Article,
  Course,
  Podcast,
  PodcastEpisode,
  Video,
  Tool,
  Directory,
  CommunityOrOrganization,
  Resources,
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

export const getCardComponent = (resource: Resources[0]) => {
  let component;

  switch (resource.type) {
    case 'thoughtleader':
      component = (
        <ThoughtleaderCard thoughtleader={resource as Thoughtleader} />
      );
      break;
    case 'book':
      component = <BookCard book={resource as Book} />;
      break;
    case 'article':
      component = <ArticleCard article={resource as Article} />;
      break;
    case 'course':
      component = <CourseCard course={resource as Course} />;
      break;
    case 'podcast':
      component = <PodcastCard podcast={resource as Podcast} />;
      break;
    case 'podcastEpisode':
      component = (
        <PodcastEpisodeCard podcastEpisode={resource as PodcastEpisode} />
      );
      break;
    case 'video':
      component = <VideoCard video={resource as Video} />;
      break;
    case 'tool':
      component = <ToolCard tool={resource as Tool} />;
      break;
    case 'directory':
      component = <DirectoryCard directory={resource as Directory} />;
      break;
    case 'communityOrOrganization':
      component = (
        <CommunityOrOranizationCard
          communityOrOrganization={resource as CommunityOrOrganization}
        />
      );
      break;
    default:
      throw new Error(`Unknown resource type: ${resource.type}`);
  }

  return component;
};
