import { Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';

export const About = () => {
  return (
    <section id="about" className="relative bg-collective-about">
      {/* Background */}
      <div className="absolute inset-0 flex">
        <Image
          src="/cave.png"
          alt="View from inside a dessert canyon into the sky."
          width={864}
          height={904}
          className="w-1/2 object-cover object-right max-h-[904px]"
        />
        <div className="w-1/2" />
      </div>

      {/* Foreground */}
      <div className="relative">
        <Container className="flex">
          <div className="w-1/2" />
          <Container inset className="w-1/2 pt-20 pb-32">
            <Heading className="text-collective-white mb-4">
              About the Collective
            </Heading>
            <Text
              as="p"
              size="large"
              className="text-collective-white-light mb-20"
            >
              Why we exist and our purpose
            </Text>
            <Text as="p" className="text-collective-white-light">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet.
            </Text>
          </Container>
        </Container>
      </div>
    </section>
  );
};
