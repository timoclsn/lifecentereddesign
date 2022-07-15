import { InferGetStaticPropsType } from 'next';
import { BookCard } from '../components/BookCard';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
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
} from '../lib/content';

export default function Home({
  co2Consumption,
  ressources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <ul>
        {ressources
          .filter((ressource) => ressource.type === 'book')
          .map((ressource: Book) => (
            <li key={ressource.id}>
              <BookCard book={ressource} />
            </li>
          ))}
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
    ...(await getArticles()),
    ...(await getCourses()),
    ...(await getPodcastEpisodes()),
    ...(await getPodcasts()),
    ...(await getVideos()),
    ...(await getTools()),
    ...(await getDirectories()),
    ...(await getCommunitiesAndOrganizations()),
    ...(await getThoughtleaders()),
  ];

  return {
    props: {
      co2Consumption,
      ressources,
    },
  };
};
