import { query } from '@/api/query';
import { Heading } from '@/design-system';
import { ProfileCards } from './ProfileCards/ProfileCards';

export const About = async () => {
  const { data, content } = await query.content.getPage('about');
  return (
    <section id="about" className="space-y-10">
      <div className="mx-auto max-w-prose space-y-20">
        <Heading level="1" className="mb-6">
          {data.title}
        </Heading>
        <div className="prose">{content}</div>
      </div>
      <ProfileCards />
    </section>
  );
};
