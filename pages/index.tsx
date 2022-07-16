import { InferGetStaticPropsType } from 'next';
import { ArticleCard } from '../components/ArticleCard';
import { BookCard } from '../components/BookCard';
import { CommunityOrOranizationCard } from '../components/CommunityOrOranizationCard';
import { CourseCard } from '../components/CourseCard';
import { DirectoryCard } from '../components/DirectoryCard';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { PodcastCard } from '../components/PodcastCard';
import { PodcastEpisodeCard } from '../components/PodcastEpisodeCard';
import { ThoughtleaderCard } from '../components/ThoughtleaderCard';
import { ToolCard } from '../components/ToolCard';
import { VideoCard } from '../components/VideoCard';
import { getCO2Consumtion } from '../lib/co2';
import {
  Article,
  Book,
  CommunityOrOrganization,
  Course,
  Directory,
  getArticles,
  getBooks,
  getCommunitiesAndOrganizations,
  getCourses,
  getDirectories,
  getPodcastEpisodes,
  getPodcasts,
  getThoughtleaders,
  getTools,
  getVideos,
  Podcast,
  PodcastEpisode,
  Thoughtleader,
  Tool,
  Video,
} from '../lib/content';

export default function Home({
  co2Consumption,
  ressources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <ul className="flex flex-wrap gap-10">
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
              <PodcastEpisodeCard
                podcastEpisode={ressource as PodcastEpisode}
              />
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
            <li key={ressource.id} className="w-[calc(50%-2.5rem)]">
              {component}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  const ressources = [
    ...(await getBooks()),
    ...(await getThoughtleaders()),
    ...(await getArticles()),
    ...(await getCourses()),
    ...(await getPodcastEpisodes()),
    ...(await getPodcasts()),
    ...(await getVideos()),
    ...(await getTools()),
    ...(await getDirectories()),
    ...(await getCommunitiesAndOrganizations()),
  ].sort(
    (a, b) =>
      new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
  );

  return {
    props: {
      co2Consumption,
      ressources,
    },
  };
};
