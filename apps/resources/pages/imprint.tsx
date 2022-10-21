import { Heading } from 'design-system';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const Imprint = ({
  content,
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Imprint" slug="imprint" co2Consumption={co2Consumption}>
      <section className="space-y-20 max-w-prose mx-auto">
        <Heading level="1" className="mb-6">
          {content?.title}
        </Heading>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.body.html }}
        />
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const content = allPages.find((page) => page.title === 'Imprint');
  if (!content) throw new Error('Imprint not found');
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  return {
    props: {
      content,
      co2Consumption,
    },
  };
};

export default Imprint;
