import { Heading } from 'design-system';
import Image from 'next/future/image';
import { Resources } from '../lib/content';
import { getCardComponent } from './utils';

interface Props {
  resources: Resources;
}

export const NewResources = ({ resources }: Props) => {
  const newResources = resources
    .sort(
      (a, b) =>
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
    )
    .slice(0, 10);

  return (
    <section id="new-resources" className="ml-[calc(50%-50vw)] w-screen">
      <Heading level="2" className="text-white mb-10 px-6 sm:px-8 xl:px-10">
        New Resources
      </Heading>
      <ul className="mb-14 flex gap-6 overflow-x-scroll px-6 sm:px-8 xl:px-10">
        <Image
          src="/ground.jpg"
          alt="Image of desert ground."
          width={320}
          height={400}
          className="hidden rounded-4xl sm:block flex-none"
        />
        {newResources.map((resource) => {
          const component = getCardComponent(resource);
          return (
            <li key={resource.id} className="w-[330px] flex-none sm:w-[600px]">
              {component}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
