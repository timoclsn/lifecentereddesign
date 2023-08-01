import { About } from './About/About';
import { Header } from './Header/Header';
import { NewResources } from '../../components/NewResources/NewResources';
import { Newsletter } from '../../components/Newsletter/Newsletter';

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
