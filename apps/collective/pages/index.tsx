import { Button, Heading } from 'design-system';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen">
      <Heading>Life Centered Design Collective</Heading>
      <Button>Go!</Button>
    </div>
  );
};

export default Home;
