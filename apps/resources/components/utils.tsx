import { Resources } from '../lib/content';
import { AgencyCard } from './ResourceCards/AgencyCard';
import { ArticleCard } from './ResourceCards/ArticleCard';
import { BookCard } from './ResourceCards/BookCard';
import { CommunityOrOranizationCard } from './ResourceCards/CommunityOrOranizationCard';
import { CourseCard } from './ResourceCards/CourseCard';
import { DirectoryCard } from './ResourceCards/DirectoryCard';
import { ExampleOrCaseStudyCard } from './ResourceCards/ExampleOrCaseStudyCard';
import { PodcastCard } from './ResourceCards/PodcastCard';
import { PodcastEpisodeCard } from './ResourceCards/PodcastEpisodeCard';
import { SlideCard } from './ResourceCards/SlideCard';
import { ThoughtleaderCard } from './ResourceCards/ThoughtleaderCard';
import { ToolCard } from './ResourceCards/ToolCard';
import { VideoCard } from './ResourceCards/VideoCard';

export const getCardComponent = (resource: Resources[0]) => {
  switch (resource.type) {
    case 'thoughtleader':
      return <ThoughtleaderCard thoughtleader={resource} />;
    case 'book':
      return <BookCard book={resource} />;
    case 'article':
      return <ArticleCard article={resource} />;
    case 'course':
      return <CourseCard course={resource} />;
    case 'podcast':
      return <PodcastCard podcast={resource} />;
    case 'podcastEpisode':
      return <PodcastEpisodeCard podcastEpisode={resource} />;
    case 'video':
      return <VideoCard video={resource} />;
    case 'tool':
      return <ToolCard tool={resource} />;
    case 'directory':
      return <DirectoryCard directory={resource} />;
    case 'communityOrOrganization':
      return <CommunityOrOranizationCard communityOrOrganization={resource} />;
    case 'exampleOrCaseStudy':
      return <ExampleOrCaseStudyCard exampleOrCaseStudy={resource} />;
    case 'agency':
      return <AgencyCard agency={resource} />;
    case 'slide':
      return <SlideCard slide={resource} />;
    default:
      throw new Error('Unknown resource type');
  }
};
