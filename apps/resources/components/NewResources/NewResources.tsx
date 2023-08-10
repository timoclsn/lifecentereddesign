import {
  Bleed,
  Card,
  Heading,
  Text,
  getRandomCardVariant,
} from 'design-system';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getResourcesCached } from '../../lib/resources';
import { Await } from '../Await/Await';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

export const NewResources = () => {
  const resources = getResourcesCached();
  return (
    <Bleed>
      <section id="new-resources">
        <Heading level="2" className="text-primary mb-10 px-6 sm:px-8 xl:px-10">
          New Resources
        </Heading>
        <ul className="mb-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:snap-none sm:px-8 xl:px-10">
          <li className="hidden flex-none snap-center sm:block">
            <Image
              src={groundImg}
              alt="Image of desert ground."
              className="rounded-4xl h-full object-cover"
            />
          </li>
          <Await promise={resources} loading={<Loading />} error={<Error />}>
            {(resources) => {
              const resourcesToDisplay = resources
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
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
            }}
          </Await>
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

const Loading = () => {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <li
              key={index}
              className="h-[492px] w-[330px] flex-none animate-pulse sm:w-[600px]"
            >
              <Card variant={getRandomCardVariant()} className="h-full" />
            </li>
          );
        })}
    </>
  );
};

const Error = () => {
  return (
    <li className="h-[492px] w-[330px] flex-none sm:w-[600px]">
      <Card
        variant="error"
        className="flex h-full items-center justify-center gap-2 text-xl text-white"
      >
        <AlertTriangle />
        Error loading new resources. Please try again…
      </Card>
    </li>
  );
};
