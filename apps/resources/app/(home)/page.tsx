import { Page } from 'components/Page/Page';
import { SearchParams } from 'lib/types';
import { NewResources } from '../../components/NewResources/NewResources';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { About } from './About/About';
import { Header } from './Header/Header';

interface Props {
  searchParams: SearchParams;
}

const Home = ({ searchParams }: Props) => {
  return (
    <Page searchParams={searchParams}>
      <Header />
      <NewResources />
      <Newsletter />
      <About />
    </Page>
  );
};

export default Home;
