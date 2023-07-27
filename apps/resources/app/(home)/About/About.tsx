import { allPages } from 'contentlayer/generated';
import { Heading } from 'design-system';
import { ProfileCards } from './ProfileCards/ProfileCards';

export const About = () => {
  const content = allPages.find((page) => page.title === 'About');
  if (!content) {
    throw new Error('About content not found');
  }

  return (
    <section id="about" className="space-y-10">
      <div className="mx-auto max-w-prose space-y-20">
        <Heading level="1" className="mb-6">
          {content.title}
        </Heading>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.body.html ?? '' }}
        />
      </div>
      <ProfileCards />
    </section>
  );
};
