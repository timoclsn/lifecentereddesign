import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const Privacy = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Privacy" slug="privacy">
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
  const content = allPages.find((page) => page.title === 'Privacy');

  return {
    props: { content },
  };
};

export default Privacy;
