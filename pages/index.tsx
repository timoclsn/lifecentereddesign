import { InferGetStaticPropsType } from 'next';

import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources';
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
      <NewResources resources={resources} />
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
  ].sort((a, b) => {
    const itemA = 'Title' in a ? a.Title : a.Name;
    const itemB = 'Title' in b ? b.Title : b.Name;
    return itemA.localeCompare(itemB);
  });

  return {
    props: {
      co2Consumption,
      resources,
    },
  };
};
