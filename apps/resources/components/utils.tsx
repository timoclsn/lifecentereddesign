import Link from 'next/link';
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
  Paper,
  Podcast,
  PodcastEpisode,
  Report,
  Resources,
  Slide,
  SocialMediaProfile,
  Thoughtleader,
  ThoughtleaderBasic,
  Tool,
  Topics,
  Video,
} from '../lib/resources';
import { TopicsButton } from './Card/TopicsButton';
import { AgencyCard } from './ResourceCards/AgencyCard';
import { ArticleCard } from './ResourceCards/ArticleCard';
import { BookCard } from './ResourceCards/BookCard';
import { CommunityCard } from './ResourceCards/CommunityCard';
import { CourseCard } from './ResourceCards/CourseCard';
import { DirectoryCard } from './ResourceCards/DirectoryCard';
import { ExampleCard } from './ResourceCards/ExampleCard';
import { MagazineCard } from './ResourceCards/MagazineCard';
import { NewsletterCard } from './ResourceCards/NewsletterCard';
import { PaperCard } from './ResourceCards/PaperCard';
import { PodcastCard } from './ResourceCards/PodcastCard';
import { PodcastEpisodeCard } from './ResourceCards/PodcastEpisodeCard';
import { ReportCard } from './ResourceCards/ReportCard';
import { SlideCard } from './ResourceCards/SlideCard';
import { SocialMediaProfileCard } from './ResourceCards/SocialMediaProfileCard';
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
    case 'paper':
      return <PaperCard paper={resource as Paper} />;
    case 'socialMediaProfile':
      return (
        <SocialMediaProfileCard
          socielaMediaProfile={resource as SocialMediaProfile}
        />
      );
    case 'report':
      return <ReportCard report={resource as Report} />;
    default:
      throw new Error(`Unknown resource type: ${resource.type}`);
  }
};

export const topicsList = (topics: Topics) => {
  return topics.map((topic, index) => {
    return (
      <>
        <TopicsButton key={topic.id} topic={topic.name}>
          {topic.name}
        </TopicsButton>
        {index !== topics.length - 1 && ', '}
      </>
    );
  });
};

export const thoughtleadersList = (
  thoughtleaders: Array<ThoughtleaderBasic>,
) => {
  return thoughtleaders.map((thoughtleader, index) => {
    return (
      <>
        <Link
          key={index}
          href={`/resources/thoughtleader-${thoughtleader.id}`}
          className="relative inline-flex items-center justify-center gap-0.5 hover:underline"
        >
          {thoughtleader.name}
        </Link>
        {index !== thoughtleaders.length - 1 && ', '}
      </>
    );
  });
};
