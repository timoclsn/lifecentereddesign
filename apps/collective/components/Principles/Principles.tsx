import { Principle } from 'contentlayer/generated';
import { Container, Heading, Text } from 'design-system';
import Image from 'next/image';
import beachImg from './beach.jpg';

interface PrinciplesProps {
  principles: Array<Principle>;
}

export const Principles = ({ principles }: PrinciplesProps) => {
  return (
    <>
      <Image
        src={beachImg}
        alt="Beach coastline from the top."
        placeholder="blur"
        className="w-full h-[200px] md:h-[440px] object-cover object-center"
        sizes="100vw"
      />
      <section id="principles" className="bg-collective-principles">
        <Container inset className="pt-20 pb-32">
          <Heading level="2" className="text-collective-text mb-4">
            LCD Principles
          </Heading>
          <Text
            as="p"
            size="large"
            className="text-collective-text-light mb-20"
          >
            The 10 principles our collective lives and works by
          </Text>
          <ol className="flex flex-wrap gap-12">
            {principles.map((principle, idx) => (
              <li
                key={idx}
                className="w-full sm:w-[calc(50%-24px)] md:w-[calc(33.33%-32px)] lg:w-[calc(20%-38.4px)]"
              >
                <Principle
                  title={principle.title}
                  description={principle.body.raw}
                />
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
};

interface PrincipleProps {
  title: string;
  description: string;
}

const Principle = ({ title, description }: PrincipleProps) => {
  return (
    <>
      <Heading
        as="h3"
        level="5"
        uppercase
        className="text-collective-text mb-3"
      >
        {title}
      </Heading>
      <Text as="p" className="text-collective-text-light">
        {description}
      </Text>
    </>
  );
};
