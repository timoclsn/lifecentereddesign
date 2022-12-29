import { Heading } from 'design-system';
import { Resources } from 'lib/resources';
import Image from 'next/image';
import { getCardComponent } from '../utils';
import groundImg from './ground.jpg';

interface Props {
  resources: Resources;
}

export const NewResources = ({ resources }: Props) => {
  return (
    <section id="new-resources" className="ml-[calc(50%-50vw)] w-screen">
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
      </ul>
    </section>
  );
};
