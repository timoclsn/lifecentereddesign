import type { NextPage } from 'next';
import Image from 'next/future/image';
import { About } from '../components/About';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { Principles } from '../components/Principles';
import { Team } from '../components/Team';

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <Image
        src="/beach.jpg"
        alt="Beach coastline from the top."
        width={1728}
        height="440"
        className="w-full h-[440px] object-cover object-center"
      />
      <Principles />
      <About />
      <Team />
    </Layout>
  );
};

export default Home;
