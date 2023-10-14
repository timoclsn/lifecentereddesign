import { allPages } from 'contentlayer/generated';
import { Heading } from 'design-system';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Imprint',
};

const ImprintPage = () => {
  const content = allPages.find((page) => page.title === 'Imprint');
  return (
    <section className="mx-auto max-w-prose space-y-20">
      <Heading level="1" className="mb-6">
        {content?.title}
      </Heading>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: content?.body.html ?? '' }}
      />
    </section>
  );
};

export default ImprintPage;
