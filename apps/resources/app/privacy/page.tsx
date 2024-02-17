import { query } from 'api/query';
import { Heading } from 'design-system';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const PrivacyPage = async () => {
  const page = await query.content.getPage('privacy');
  return (
    <section className="mx-auto max-w-prose space-y-20">
      <Heading level="1" className="mb-6">
        {page.title}
      </Heading>
      <div className="prose">{page.body}</div>
    </section>
  );
};

export default PrivacyPage;
