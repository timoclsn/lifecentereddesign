import Image from 'next/future/image';
import { Button } from './Button';

export function Header() {
  return (
    <section>
      <h1 className="mb-8 max-w-3xl font-serif text-3xl sm:text-7xl">
        <span className="font-bold">Life-centered design</span> related
        resources
      </h1>
      <p className="mb-20 max-w-5xl text-2xl text-text-secondary">
        Life Centered Design.Net is a curated directory of resources to help us
        design more responsible, sustainable, ethical and all in all more
        meaningful products and services.
      </p>
      <Button size="large" href="/" variant="contained">
        About this directory
      </Button>
      <div className="ml-[calc(50%-50vw)] mt-24 flex w-screen items-center justify-center bg-[#1A2539]">
        <Image
          src="/earth.jpg"
          alt="Image of the earth from space."
          width={878}
          height={380}
        />
      </div>
    </section>
  );
}
