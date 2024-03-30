import { query } from 'api/query';
import { NewResources } from '../../components/NewResources/NewResources';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { About } from './About/About';
import { Header } from './Header/Header';
import { db } from 'lib/db';

const Home = async () => {
  const resources = await query.resources.getResourcesNew({
    filter: {
      search: 'test',
    },
  });

  console.log('Resources:', JSON.stringify(resources, null, 2));

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
