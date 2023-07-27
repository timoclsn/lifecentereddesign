import { About } from './About/About';
import { Header } from './Header/Header';
import { NewResources } from './NewResources/NewResources';
import { Newsletter } from './Newsletter/Newsletter';

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
