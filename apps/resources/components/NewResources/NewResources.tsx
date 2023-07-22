import { UilArrowRight } from '@iconscout/react-unicons';
import { Bleed, Card, Heading, Text } from 'design-system';
import { getResources } from 'lib/resources';
import Image from 'next/image';
import Link from 'next/link';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';
import { Suspense } from 'react';

export const NewResources = async () => {
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
            className="rounded-4xl hidden flex-none snap-center sm:block"
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
                  <UilArrowRight />
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

const Loading = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <li
          key={index}
          className="rounded-4xl bg-lime h-[490px] w-[600px] flex-none animate-pulse"
        />
      ))}
    </>
  );
};
const NewResourcesInner = async () => {
  const resources = await getResources({ sort: 'date', limit: 10 });
  return (
    <>
      {resources.map((resource) => {
        const component = getCardComponent(resource);
        return (
          <li
            key={`${resource.type}-${resource.id}`}
            className="w-[330px] flex-none snap-center sm:w-[600px]"
          >
            {component}
          </li>
        );
      })}
    </>
  );
};
