import { InferGetStaticPropsType } from 'next';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { Ressources } from '../components/Ressources';
import { getCO2Consumtion } from '../lib/co2';
import {
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
      <Ressources ressources={ressources} />
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
