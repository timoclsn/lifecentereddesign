import { allMembers, allPrinciples } from 'contentlayer/generated';
import type { InferGetStaticPropsType } from 'next';
import Image from 'next/future/image';
import { About } from '../components/About';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { Principles } from '../components/Principles';
import { Team } from '../components/Team';

const Home = ({
  members,
  principles,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Header />
      <Image
        src="/beach.jpg"
        alt="Beach coastline from the top."
        width={1728}
        height={440}
        className="w-full h-[200px] md:h-[440px] object-cover object-center"
        sizes="100vw"
      />
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
