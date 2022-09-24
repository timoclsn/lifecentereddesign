import { Resources } from '../lib/content';
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
      component = <ThoughtleaderCard thoughtleader={resource} />;
      break;
    case 'book':
      component = <BookCard book={resource} />;
      break;
    case 'article':
      component = <ArticleCard article={resource} />;
      break;
    case 'course':
      component = <CourseCard course={resource} />;
      break;
    case 'podcast':
      component = <PodcastCard podcast={resource} />;
      break;
    case 'podcastEpisode':
      component = <PodcastEpisodeCard podcastEpisode={resource} />;
      break;
    case 'video':
      component = <VideoCard video={resource} />;
      break;
    case 'tool':
      component = <ToolCard tool={resource} />;
      break;
    case 'directory':
      component = <DirectoryCard directory={resource} />;
      break;
    case 'communityOrOrganization':
      component = (
        <CommunityOrOranizationCard communityOrOrganization={resource} />
      );
      break;
    default:
      throw new Error('Unknown resource type');
  }

  return component;
};
