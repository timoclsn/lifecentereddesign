import { Page } from 'components/Page/Page';
import { allPages } from 'contentlayer/generated';
import { Heading } from 'design-system';
import { SearchParams } from 'lib/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

interface Props {
  searchParams: SearchParams;
}

const PrivacyPage = ({ searchParams }: Props) => {
  const content = allPages.find((page) => page.title === 'Privacy');
  return (
    <Page searchParams={searchParams}>
      <section className="mx-auto max-w-prose space-y-20">
        <Heading level="1" className="mb-6">
          {content?.title}
        </Heading>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content?.body.html ?? '' }}
        />
      </section>
    </Page>
  );
};

export default PrivacyPage;
