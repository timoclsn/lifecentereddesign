import { Dialogs } from 'components/Dialogs/Dialogs';
import { NewResources } from '../../components/NewResources/NewResources';
import { Newsletter } from '../../components/Newsletter/Newsletter';
import { About } from './About/About';
import { Header } from './Header/Header';

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Home = ({ searchParams }: Props) => {
  return (
    <>
      <Header />
      <NewResources />
      <Newsletter />
      <About />
      <Dialogs searchParams={searchParams} />
    </>
  );
};

export default Home;
