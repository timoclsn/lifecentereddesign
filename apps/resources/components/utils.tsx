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
  Video,
} from 'lib/resources';
import Link from 'next/link';
import { Fragment } from 'react';
import { TopicsButton } from './ResourceCard/TopicsButton';
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
import { Creators, Topics } from 'data/resources/query';

export const getCardComponent = (
  resource: Resources[0],
  options: {
    showPreview?: boolean;
  } = {},
) => {
  const { showPreview } = options;
  switch (resource.type) {
    case 'thoughtleader':
      return (
        <ThoughtleaderCard
          thoughtleader={resource as Thoughtleader}
          showPreview={showPreview}
        />
      );
    case 'book':
      return <BookCard book={resource as Book} showPreview={showPreview} />;
    case 'article':
      return (
        <ArticleCard article={resource as Article} showPreview={showPreview} />
      );
    case 'course':
      return (
        <CourseCard course={resource as Course} showPreview={showPreview} />
      );
    case 'podcast':
      return (
        <PodcastCard podcast={resource as Podcast} showPreview={showPreview} />
      );
    case 'podcastEpisode':
      return (
        <PodcastEpisodeCard
          podcastEpisode={resource as PodcastEpisode}
          showPreview={showPreview}
        />
      );
    case 'video':
      return <VideoCard video={resource as Video} showPreview={showPreview} />;
    case 'tool':
      return <ToolCard tool={resource as Tool} showPreview={showPreview} />;
    case 'directory':
      return (
        <DirectoryCard
          directory={resource as Directory}
          showPreview={showPreview}
        />
      );
    case 'community':
      return (
        <CommunityCard
          community={resource as Community}
          showPreview={showPreview}
        />
      );
    case 'example':
      return (
        <ExampleCard example={resource as Example} showPreview={showPreview} />
      );
    case 'agency':
      return (
        <AgencyCard agency={resource as Agency} showPreview={showPreview} />
      );
    case 'slide':
      return <SlideCard slide={resource as Slide} showPreview={showPreview} />;
    case 'magazine':
      return (
        <MagazineCard
          magazine={resource as Magazine}
          showPreview={showPreview}
        />
      );
    case 'newsletter':
      return (
        <NewsletterCard
          newsletter={resource as Newsletter}
          showPreview={showPreview}
        />
      );
    case 'paper':
      return <PaperCard paper={resource as Paper} showPreview={showPreview} />;
    case 'socialMediaProfile':
      return (
        <SocialMediaProfileCard
          socielaMediaProfile={resource as SocialMediaProfile}
          showPreview={showPreview}
        />
      );
    case 'report':
      return (
        <ReportCard report={resource as Report} showPreview={showPreview} />
      );
    default:
      throw new Error(`Unknown resource type: ${resource.type}`);
  }
};

export const topicsList = (topics: Topics) => {
  return topics.map((topic, index) => {
    return (
      <Fragment key={topic.id}>
        <TopicsButton topic={topic.id}>{topic.name}</TopicsButton>
        {index !== topics.length - 1 && ', '}
      </Fragment>
    );
  });
};

export const creatorList = (creators: Creators) => {
  return creators.map((creator, index) => {
    return (
      <Fragment key={creator.id}>
        <Link
          href={`/resources/${creator.id}`}
          className="relative inline-flex items-center justify-center gap-0.5 hover:underline"
        >
          {creator.name}
        </Link>
        {index !== creators.length - 1 && ', '}
      </Fragment>
    );
  });
};
