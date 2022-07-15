import { InferGetStaticPropsType } from 'next';
import { BookCard } from '../components/BookCard';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { ThoughtleaderCard } from '../components/ThoughtleaderCard';
import { getCO2Consumtion } from '../lib/co2';
import {
  Book,
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
  Thoughtleader,
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
    // ...(await getArticles()),
    // ...(await getCourses()),
    // ...(await getPodcastEpisodes()),
    // ...(await getPodcasts()),
    // ...(await getVideos()),
    // ...(await getTools()),
    // ...(await getDirectories()),
    // ...(await getCommunitiesAndOrganizations()),
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
