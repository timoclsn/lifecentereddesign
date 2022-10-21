import { Container, Heading, Text } from 'design-system';
const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Principles = () => {
  return (
    <section id="principles" className="bg-collective-principles">
      <Container inset className="pt-20 pb-32">
        <Heading level="2" className="text-collective-text mb-4">
          LCD Principles
        </Heading>
        <Text as="p" size="large" className="text-collective-text-light mb-20">
          The 10 principles our collective lives and works by
        </Text>
        <ul className="flex flex-wrap gap-12">
          {count.map((item) => (
            <li key={item} className="w-[calc(20%-48px)]">
              <Principle />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

const Principle = () => {
  return (
    <div>
      <Heading level="4" className="text-collective-text mb-3 uppercase">
        1. Principle Headline
      </Heading>
      <Text as="p" className="text-collective-text-light">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.{' '}
      </Text>
    </div>
  );
};
