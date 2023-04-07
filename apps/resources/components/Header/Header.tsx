import { Bleed, Button, Heading, Text } from 'design-system';
import Image from 'next/image';
import earthImg from './earth.jpg';

export function Header() {
  return (
    <section>
      <Heading level="1" className="mb-8 max-w-3xl font-normal">
        <span className="font-bold">Life-centered design</span> related
        resources
      </Heading>
      <Text as="p" size="large" className="text-text-secondary mb-20 max-w-5xl">
        Life Centered Design.Net is a curated directory of resources to help us
        design more responsible, sustainable, ethical and all in all more
        meaningful products, systems, and services.
      </Text>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="large" href="/resources" variant="contained">
          Discover resources
        </Button>
        <Button size="large" href="/resources#suggestion" variant="outline">
          Suggest resource
        </Button>
      </div>
      <Bleed>
        <div className="mt-24 flex h-[200px] justify-center bg-[#070C10] md:h-[380px]">
          <div className="relative w-[900px]">
            <Image
              src={earthImg}
              alt="Image of the earth from space."
              placeholder="blur"
              priority
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-r from-[#070C10] to-[#070C10]/0" />
            <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-l from-[#070C10] to-[#070C10]/0" />
          </div>
        </div>
      </Bleed>
    </section>
  );
}
