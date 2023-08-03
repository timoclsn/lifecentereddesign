import { Bleed, Card, Heading, Text, getRandomBackground } from 'design-system';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { getResourcesCached } from '../../lib/resources';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

export const NewResources = () => {
  return (
    <Bleed>
      <section id="new-resources">
        <Heading level="2" className="text-primary mb-10 px-6 sm:px-8 xl:px-10">
          New Resources
        </Heading>
        <ul className="mb-14 flex snap-x gap-6 overflow-x-auto px-6 sm:px-8 xl:px-10">
          <Image
            src={groundImg}
            alt="Image of desert ground."
            className="rounded-4xl hidden flex-none snap-center object-cover sm:block"
          />
          <Suspense fallback={<Loading />}>
            <NewResourcesInner />
          </Suspense>
          <li className="rounded-4xl flex-none snap-center">
            <Link href="/resources" className="block h-full hover:opacity-80">
              <Card
                variant="primary"
                className="flex h-full items-center justify-center"
              >
                <div className="text-primary-contrast-text flex items-center justify-center gap-2 [&>svg]:h-[25px] [&>svg]:w-[25px]">
                  <ArrowRight />
                  <Text size="large">All Resources</Text>
                </div>
              </Card>
            </Link>
          </li>
        </ul>
      </section>
    </Bleed>
  );
};

const NewResourcesInner = async () => {
  const resources = await getResourcesCached();

  const resourcesToDisplay = resources
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);
  return (
    <>
      {resourcesToDisplay.map((resource) => {
        const component = getCardComponent(resource);
        return (
          <li
            key={`${resource.type}-${resource.id}`}
            className="relative w-[330px] flex-none snap-center sm:w-[600px]"
          >
            {component}
          </li>
        );
      })}
    </>
  );
};

const Loading = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              key={index}
              className={`rounded-4xl h-[492px] w-[330px] flex-none animate-pulse sm:w-[600px] ${getRandomBackground()}`}
            />
          );
        })}
    </>
  );
};
