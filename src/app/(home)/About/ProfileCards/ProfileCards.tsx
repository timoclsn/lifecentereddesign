import { Link } from '@/design-system';
import kathaImg from './katharina-clasen.png';
import timoImg from './timo-clasen.png';
import { ProfileCard } from './ProfileCard';

export const ProfileCards = () => {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-5 md:flex-row">
      <ProfileCard
        variant="sky"
        name="Katharina Clasen"
        image={kathaImg}
        websiteUrl="https://katharinaclasen.de"
        linkedInUrl="https://www.linkedin.com/in/katharina-clasen/"
        instagramUrl="https://www.instagram.com/katharinaclasen/"
        twitterUrl="https://twitter.com/KatharinaClasen"
      >
        <span className="mb-4 block text-text-primary">
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
        <span className="mb-4 block text-text-primary">Development</span>
        Frontend Engineer (
        <Link url="https://steuerbot.com" external>
          Steuerbot
        </Link>
        )
      </ProfileCard>
    </section>
  );
};
