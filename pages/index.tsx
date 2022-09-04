import { InferGetStaticPropsType } from 'next';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NewResources } from '../components/NewResources';
import { Newsletter } from '../components/Newsletter';
import { Resources } from '../components/Resources';
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
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Header />
      <NewResources resources={resources} />
      <Newsletter />
      <Resources resources={resources} />
    </Layout>
  );
}

export const getStaticProps = async () => {
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
      resources,
    },
  };
};
