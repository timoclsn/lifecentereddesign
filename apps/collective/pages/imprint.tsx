import { Heading } from 'design-system';
import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const Imprint = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Imprint" slug="imprint">
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
  return {
    props: {
      content,
    },
  };
};

export default Imprint;
