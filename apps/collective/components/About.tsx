import { Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';
import Link from 'next/link';

export const About = () => {
  return (
    <section id="about" className="relative bg-collective-about">
      {/* Background */}
      <div className="hidden md:flex absolute inset-0">
        <Image
          src="/cave.png"
          alt="View from inside a dessert canyon into the sky."
          width={864}
          height={904}
          sizes="50vw"
          className="w-1/2 object-cover object-right max-h-[904px]"
        />
        <div className="w-1/2" />
      </div>

      {/* Foreground */}
      <div className="relative">
        <Container className="flex">
          <div className="hidden md:block w-1/2" />
          <Container inset className="w-full md:w-1/2 pt-20 pb-32">
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
            <Text as="p" className="text-collective-white-light">
              The Life Centered Design Collective is a small group of designers
              and educators with varying backgrounds. Our goal is to bring
              together people, skills and knowledge that advance the practice
              and advocate for the philosophy of life-centered design.
              <br />
              <br />
              We imagine a world where all life and long-term effects are top of
              mind while creating products, services and systems.
              <br />
              <br />
              If you have questions or just want to get in touch, feel free to
              contact anyone of our{' '}
              <Link href="/#team" className="underline">
                members
              </Link>
              .
            </Text>
          </Container>
        </Container>
      </div>
    </section>
  );
};
