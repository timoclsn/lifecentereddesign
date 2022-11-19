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
} from 'lib/content';
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
    case 'THOUGHTLEADER':
      return <ThoughtleaderCard thoughtleader={resource as Thoughtleader} />;
    case 'BOOK':
      return <BookCard book={resource as Book} />;
    case 'ARTICLE':
      return <ArticleCard article={resource as Article} />;
    case 'COURSE':
      return <CourseCard course={resource as Course} />;
    case 'PODCAST':
      return <PodcastCard podcast={resource as Podcast} />;
    case 'PODCASTEPISODE':
      return <PodcastEpisodeCard podcastEpisode={resource as PodcastEpisode} />;
    case 'VIDEO':
      return <VideoCard video={resource as Video} />;
    case 'TOOL':
      return <ToolCard tool={resource as Tool} />;
    case 'DIRECTORY':
      return <DirectoryCard directory={resource as Directory} />;
    case 'COMMUNITY':
      return <CommunityCard community={resource as Community} />;
    case 'EXAMPLE':
      return <ExampleCard example={resource as Example} />;
    case 'AGENCY':
      return <AgencyCard agency={resource as Agency} />;
    case 'SLIDE':
      return <SlideCard slide={resource as Slide} />;
    case 'MAGAZINE':
      return <MagazineCard magazine={resource as Magazine} />;
    case 'NEWSLETTER':
      return <NewsletterCard newsletter={resource as Newsletter} />;
    default:
      throw new Error('Unknown resource type');
  }
};
