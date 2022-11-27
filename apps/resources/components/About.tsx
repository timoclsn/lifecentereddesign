import { Page } from 'contentlayer/generated';
import { Heading } from 'design-system';
import { ProfileCards } from './ProfileCards/ProfileCards';

interface Props {
  content: Page;
}

export const About = ({ content }: Props) => {
  return (
    <section id="about" className="space-y-10">
      <div className="space-y-20 max-w-prose mx-auto">
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
