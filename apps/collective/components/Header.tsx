import { Button, Container, Heading, Text } from 'design-system';
import Image from 'next/future/image';

export const Header = () => {
  return (
    <section className="bg-collective-grey">
      <Container>
        <div className="flex">
          <div className="flex flex-col items-start justify-end pb-32 px-6 sm:px-8">
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
            <Button>Join the Collective</Button>
          </div>
          <div>
            <Image
              src="/earth.png"
              alt="Image of the earth"
              width={656}
              height={1117}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
