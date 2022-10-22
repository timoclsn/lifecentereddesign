import { Container, Heading } from 'design-system';
import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const Privacy = ({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="Privacy" slug="privacy">
      <Container inset>
        <section className="space-y-20 max-w-prose mx-auto">
          <Heading level="1" className="mb-6">
            {content?.title}
          </Heading>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content.body.html }}
          />
        </section>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const content = allPages.find((page) => page.title === 'Privacy');
  if (!content) throw new Error('Privacy not found');

  return {
    props: {
      content,
    },
  };
};

export default Privacy;
