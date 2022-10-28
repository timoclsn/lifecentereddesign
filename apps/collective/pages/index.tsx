import { allMembers, allPrinciples } from 'contentlayer/generated';
import type { InferGetStaticPropsType } from 'next';
import { About } from '../components/About/About';
import { Header } from '../components/Header/Header';
import { Layout } from '../components/Layout';
import { Principles } from '../components/Principles/Principles';
import { Team } from '../components/Team';

const Home = ({
  members,
  principles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Header />
      <Principles principles={principles} />
      <About />
      <Team members={members} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const members = allMembers;
  const principles = allPrinciples;
  return {
    props: {
      members,
      principles,
    },
  };
};

export default Home;
