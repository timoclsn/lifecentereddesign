import {
  Agency,
  Article,
  Book,
  Community,
  Course,
  Directory,
  Example,
  Magazine,
  Newsletter,
  Podcast,
  PodcastEpisode,
  Resources,
  Slide,
  Thoughtleader,
  Tool,
  Video,
} from 'lib/resources';
import { AgencyCard } from './ResourceCards/AgencyCard';
import { ArticleCard } from './ResourceCards/ArticleCard';
import { BookCard } from './ResourceCards/BookCard';
import { CommunityCard } from './ResourceCards/CommunityCard';
import { CourseCard } from './ResourceCards/CourseCard';
import { DirectoryCard } from './ResourceCards/DirectoryCard';
import { ExampleCard } from './ResourceCards/ExampleCard';
import { MagazineCard } from './ResourceCards/MagazineCard';
import { NewsletterCard } from './ResourceCards/NewsletterCard';
import { PodcastCard } from './ResourceCards/PodcastCard';
import { PodcastEpisodeCard } from './ResourceCards/PodcastEpisodeCard';
import { SlideCard } from './ResourceCards/SlideCard';
import { ThoughtleaderCard } from './ResourceCards/ThoughtleaderCard';
import { ToolCard } from './ResourceCards/ToolCard';
import { VideoCard } from './ResourceCards/VideoCard';

export const getCardComponent = (resource: Resources[0]) => {
  switch (resource.type) {
    case 'thoughtleader':
      return <ThoughtleaderCard thoughtleader={resource as Thoughtleader} />;
    case 'book':
      return <BookCard book={resource as Book} />;
    case 'article':
      return <ArticleCard article={resource as Article} />;
    case 'course':
      return <CourseCard course={resource as Course} />;
    case 'podcast':
      return <PodcastCard podcast={resource as Podcast} />;
    case 'podcastEpisode':
      return <PodcastEpisodeCard podcastEpisode={resource as PodcastEpisode} />;
    case 'video':
      return <VideoCard video={resource as Video} />;
    case 'tool':
      return <ToolCard tool={resource as Tool} />;
    case 'directory':
      return <DirectoryCard directory={resource as Directory} />;
    case 'community':
      return <CommunityCard community={resource as Community} />;
    case 'example':
      return <ExampleCard example={resource as Example} />;
    case 'agency':
      return <AgencyCard agency={resource as Agency} />;
    case 'slide':
      return <SlideCard slide={resource as Slide} />;
    case 'magazine':
      return <MagazineCard magazine={resource as Magazine} />;
    case 'newsletter':
      return <NewsletterCard newsletter={resource as Newsletter} />;
    default:
      throw new Error('Unknown resource type');
  }
};
