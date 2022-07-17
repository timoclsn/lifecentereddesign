import { InferGetStaticPropsType } from 'next';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { Resources } from '../components/Resources';
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
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout co2Consumption={co2Consumption}>
      <Header />
      <Resources resources={resources} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  const resources = [
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
  ];

  return {
    props: {
      co2Consumption,
      resources,
    },
  };
};
