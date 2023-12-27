import { Await } from 'components/Await/Await';
import { getOgImageLink, isUrl } from 'lib/utils/utils';
import Image from 'next/image';

interface Props {
  url: string;
}

export const Preview = ({ url }: Props) => {
  const promise = getOgImageLink(url);

  return (
    <div className="bg-ghost-main-dark-bg @3xl:w-[300px] @5xl:w-[500px] relative -z-10 aspect-video w-full flex-none">
      <Await promise={promise} loading={<Loading />} error={<Error />}>
        {(ogImageLink) => {
          if (!isUrl(ogImageLink)) {
            return <Error />;
          }

          return (
            <Image
              src={ogImageLink}
              alt="Preview image of the resource"
              fill
              className="object-contain"
              unoptimized
            />
          );
        }}
      </Await>
    </div>
  );
};

const Loading = () => {
  return <div className="bg-ghost-main-dark-bg h-full w-full animate-pulse" />;
};

const Error = () => {
  return (
    <div className="bg-ghost-main-dark-bg flex h-full w-full items-center justify-center">
      <span>Preview unavailabe</span>
    </div>
  );
};
