import { Button, Container, Heading, Text } from 'design-system';
import Image from 'next/image';
import earthImg from './earth.png';

export const Header = () => {
  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 flex">
        <div className="w-full md:w-2/3 bg-collective-grey" />
        <div className="hidden md:block w-1/3 bg-collective-header-bg" />
      </div>

      {/* Foreground */}
      <div className="relative">
        <Container className="flex">
          <Container
            inset
            className="w-full md:w-2/3 pt-40 sm:pt-80 pb-16 sm:pb-32"
          >
            <div className="max-w-prose">
              <Heading
                level="1"
                className="font-normal mb-8 text-collective-text"
              >
                The <span className="font-bold">Life Centered Design</span>{' '}
                Collective
              </Heading>
              <Text
                as="p"
                size="large"
                className="text-collective-text-light mb-20"
              >
                Spreading the Life-centered Design mindset
              </Text>
              <Button size="large" href="/#about">
                About the Collective
              </Button>
            </div>
          </Container>
          <Image
            src={earthImg}
            alt="Image of the earth"
            placeholder="blur"
            priority
            sizes="33vw"
            className="hidden md:block object-contain w-1/3 bg-collective-header-bg"
          />
        </Container>
      </div>
    </section>
  );
};
