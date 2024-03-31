import { query } from 'api/query';
import { NewResources } from '../../components/NewResources/NewResources';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { About } from './About/About';
import { Header } from './Header/Header';

const Home = async () => {
  const resources = await query.resources.getResourcesNew({
    orderBy: 'date',
    filter: {},
  });

  console.log('Resources:', JSON.stringify(resources, null, 2));
  console.log(resources.length);

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
