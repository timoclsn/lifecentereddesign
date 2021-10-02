import { GetStaticProps } from 'next';

import { About } from '../components/About';
import { AboutUs } from '../components/AboutUs';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Page } from '../components/Page';
import { NewsletterCard } from '../components/NewsletterCard';
import { getCO2Consumtion } from '../lib/co2';

export default function Home(props) {
  return (
    <Page co2Consumption={props.co2Consumption}>
      <Header />
      <Categories />
      <About />
      <NewsletterCard />
      <AboutUs />
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  return {
    props: { co2Consumption },
  };
};
