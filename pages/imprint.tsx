import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';
import { getCO2Consumtion } from '../lib/co2';

const Imprint = ({
  co2Consumption,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout co2Consumption={co2Consumption} title="Imprint" slug="imprint">
      <section className="space-y-20">
        <h1 className="mb-6 text-5xl font-bold">{content.title}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.body.html }}
        />
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const co2Consumption = await getCO2Consumtion(
    'https://lifecentereddesign.net'
  );

  const content = allPages.find((page) => page.title === 'Imprint');

  return {
    props: { co2Consumption, content },
  };
};

export default Imprint;
