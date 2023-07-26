import { UilArrowRight } from '@iconscout/react-unicons';
import { Bleed, Card, Heading, Text } from 'design-system';
import { getResources } from 'lib/resources';
import { unstable_cache as cache } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

export const NewResources = async () => {
  const resources = await cache(getResources, undefined, {
    revalidate: 60,
    tags: ['resources'],
  })();

  const resourcesToDisplay = resources
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

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
          {resourcesToDisplay.map((resource) => {
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
