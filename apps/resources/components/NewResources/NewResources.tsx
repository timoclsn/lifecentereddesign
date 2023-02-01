import { UilArrowRight } from '@iconscout/react-unicons';
import { Bleed, Card, Heading, Text } from 'design-system';
import { Resources } from 'lib/resources';
import Image from 'next/image';
import Link from 'next/link';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

interface Props {
  resources: Resources;
}

export const NewResources = ({ resources }: Props) => {
  return (
    <Bleed>
      <section id="new-resources">
        <Heading level="2" className="text-white mb-10 px-6 sm:px-8 xl:px-10">
          New Resources
        </Heading>
        <ul className="mb-14 flex gap-6 overflow-x-auto px-6 sm:px-8 xl:px-10 snap-x">
          <Image
            src={groundImg}
            alt="Image of desert ground."
            className="hidden rounded-4xl sm:block flex-none snap-center"
          />
          {resources.map((resource) => {
            const component = getCardComponent(resource);
            return (
              <li
                key={`${resource.type}-${resource.id}`}
                className="w-[330px] flex-none sm:w-[600px] snap-center"
              >
                {component}
              </li>
            );
          })}
          <li className="snap-center rounded-4xl flex-none">
            <Link href="/resources" className="block h-full hover:opacity-80">
              <Card
                variant="primary"
                className="h-full flex items-center justify-center"
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
