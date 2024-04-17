import { query } from '@/api/query';
import { Track } from '@/components/Track/Track';
import {
  Bleed,
  Card,
  Heading,
  Text,
  getRandomCardVariant,
} from '@/design-system';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Await } from '../Await/Await';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import groundImg from './ground.jpg';

export const NewResources = () => {
  const promise = query.resources.getResources({
    limit: 10,
    sort: ['date'],
  });
  return (
    <Bleed>
      <section id="new-resources">
        <Heading level="2" className="text-primary mb-10 px-6 sm:px-8 xl:px-10">
          New Resources
        </Heading>
        <ul className="mb-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 sm:snap-none sm:px-8 xl:px-10">
          <li className="hidden flex-none snap-center snap-always sm:block">
            <Image
              src={groundImg}
              alt="Image of desert ground."
              placeholder="blur"
              className="h-full rounded-4xl object-cover"
            />
          </li>
          <Await promise={promise} loading={<Loading />} error={<Error />}>
            {({ resources }) => {
              return (
                <>
                  {resources.map((resource) => {
                    return (
                      <Track
                        as="li"
                        key={resource.id}
                        event="New resource clicked"
                        className="relative w-[330px] flex-none snap-center snap-always sm:w-[600px]"
                      >
                        <ResourceCard resource={resource} />
                      </Track>
                    );
                  })}
                </>
              );
            }}
          </Await>
          <li className="flex-none snap-center snap-always rounded-4xl">
            <Link href="/resources" className="block h-full hover:opacity-80">
              <Card
                variant="primary"
                className="flex h-full items-center justify-center"
              >
                <div className="flex items-center justify-center gap-2 text-primary-contrast-text [&>svg]:size-[25px]">
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
