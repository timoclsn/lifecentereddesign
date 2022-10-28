import { ProfileCard } from 'components/ProfileCard';
import { Link } from 'design-system';
import kathaImg from './katharina-clasen.png';
import timoImg from './timo-clasen.png';

export const ProfileCards = () => {
  return (
    <section className="flex gap-5 flex-col md:flex-row max-w-5xl mx-auto">
      <ProfileCard
        variant="sky"
        name="Katharina Clasen"
        image={kathaImg}
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
        image={timoImg}
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
  );
};
