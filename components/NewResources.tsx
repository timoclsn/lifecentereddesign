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
    <section
      id="new-resources"
      className="relative -mx-6 rounded-none bg-black py-10 px-6 sm:mx-0 sm:rounded-5xl sm:p-20"
    >
      <div className="absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-30">
        <Image
          src="/confetti-top.svg"
          width={938}
          height={109}
          alt="Confetti"
          className="absolute right-[18px] top-[18px] min-w-[938px]"
        />
        <Image
          src="/confetti-left.svg"
          width={72}
          height={435}
          alt="Confetti"
          className="absolute left-[-10px] top-[102px] min-w-[72px]"
        />
        <Image
          src="/confetti-right.svg"
          width={238}
          height={143}
          alt="Confetti"
          className="absolute right-[-6px] bottom-[26px] min-w-[238px]"
        />
        <Image
          src="/confetti-bottom.svg"
          width={1136}
          height={79}
          alt="Confetti"
          className="absolute left-[28px] bottom-[-8px] min-w-[1136px]"
        />
      </div>
      <div className="relative z-20">
        <h2 className="mb-10 text-2xl font-bold text-white">New Resources</h2>
        <ul className="-mx-6 mb-14 flex snap-x gap-6 overflow-x-scroll px-6 sm:-mx-20 sm:px-20">
          {newResources.map((resource) => {
            const component = getCardComponent(resource);
            return (
              <li
                key={resource.id}
                className="w-[330px] flex-none snap-center sm:w-[600px]"
              >
                {component}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
