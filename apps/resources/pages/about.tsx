import { ProfileCard } from 'components/ProfileCard';
import { Heading, Link } from 'design-system';
import { getCO2Consumtion } from 'lib/co2';
import { InferGetStaticPropsType } from 'next';
import { allPages } from '../.contentlayer/generated';
import { Layout } from '../components/Layout';

const About = ({
  content,
  co2Consumption,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout title="About" slug="about" co2Consumption={co2Consumption}>
      <section className="space-y-20 max-w-prose mx-auto">
        <Heading level="1" className="mb-6">
          {content?.title}
        </Heading>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content?.body.html ?? '' }}
        />
      </section>
      <section className="flex gap-5 flex-col md:flex-row max-w-5xl mx-auto">
        <ProfileCard
          variant="sky"
          name="Katharina Clasen"
          imagePath="/profile/katharina-clasen.png"
          websiteUrl="https://katharinaclasen.de"
          linkedInUrl="https://www.linkedin.com/in/katharina-clasen/"
          instagramUrl="https://www.instagram.com/katharinaclasen/"
          twitterUrl="https://twitter.com/KatharinaClasen"
        >
          <span className="block text-text-primary mb-4">
            Idea, concept, design & content
          </span>
          UX Designer (self-employed), Lecturer (
          <Link url="https://www.hdm-stuttgart.de/" external>
            Stuttgart Media University
          </Link>
          )
        </ProfileCard>
        <ProfileCard
          variant="evening"
          name="Timo Clasen"
          imagePath="/profile/timo-clasen.png"
          websiteUrl="https://timoclasen.de"
          linkedInUrl="https://www.linkedin.com/in/timoclsn"
          twitterUrl="https://twitter.com/timoclsn"
        >
          <span className="block text-text-primary mb-4">Development</span>
          Frontend Engineer (
          <Link url="https://steuerbot.com" external>
            Steuerbot
          </Link>
          )
        </ProfileCard>
      </section>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const content = allPages.find((page) => page.title === 'About');
  const co2Consumption = await getCO2Consumtion('lifecentereddesign.net');

  return {
    props: {
      content,
      co2Consumption,
    },
  };
};

export default About;
