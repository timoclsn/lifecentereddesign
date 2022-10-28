import { ProfileCards } from 'components/ProfileCards/ProfileCards';
import { Heading } from 'design-system';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const About = ({
  content,
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="About" slug="about" co2Consumption={co2Consumption}>
      <section className="space-y-20 max-w-prose mx-auto">
        <Heading level="1" className="mb-6">
          {content?.title}
        </Heading>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content?.body.html ?? '' }}
        />
      </section>
      <ProfileCards />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const content = allPages.find((page) => page.title === 'About');
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  return {
    props: {
      content,
      co2Consumption,
    },
  };
};

export default About;
