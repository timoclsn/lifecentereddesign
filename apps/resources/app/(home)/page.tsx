import { About } from 'components/About';
import { Header } from 'components/Header/Header';
import { NewResources } from 'components/NewResources/NewResources';
import { Newsletter } from 'components/Newsletter/Newsletter';

const Home = () => {
  return (
    <>
      <Header />
      <NewResources />
      <Newsletter />
      <About />
    </>
  );
};

export default Home;
