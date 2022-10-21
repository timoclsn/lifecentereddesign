import { Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';

export const About = () => {
  return (
    <section id="about" className="bg-collective-about">
      <Container className="flex">
        <Image
          src="/sand.jpg"
          alt="View from inside a dessert canyon into the sky."
          width={864}
          height={904}
        />
        <div className="px-6 sm:px-8 pt-20 pb-32">
          <Heading className="text-collective-white mb-4">
            About the Collective
          </Heading>
          <Text
            as="p"
            size="large"
            className="text-collective-white-light mb-14"
          >
            Why we exist and our purpose
          </Text>
          <Text as="p" size="large" className="text-collective-white-light">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet.
          </Text>
        </div>
      </Container>
    </section>
  );
};
