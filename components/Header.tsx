import { Button } from './Button';

export function Header() {
  return (
    <section className="max-w-xl">
      <h1 className="mb-6 text-3xl font-bold sm:text-5xl">
        Life-centered design related resources
      </h1>
      <p className="mb-10 text-dark">
        Life Centered Design.Net is a curated directory of resources to help us
        design more responsible, sustainable, ethical and all in all more
        meaningful products and services.
      </p>
      <Button
        secondary
        bgColor="bg-grass"
        text="About this directory"
        size="l"
        href="/"
      />
    </section>
  );
}
