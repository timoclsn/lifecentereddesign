import { query } from '@/api/query';
import { Await } from '@/components/Await/Await';
import Image from 'next/image';

interface Props {
  url: string;
  id: number;
}

export const Preview = ({ url, id }: Props) => {
  const promise = query.resources.getOgImageLink({
    url,
    id,
  });

  return (
    <div className="relative -z-10 aspect-video w-full flex-none bg-ghost-main-dark-bg @3xl:w-[300px] @5xl:w-[500px]">
      <Await promise={promise} loading={<Loading />} error={<Error />}>
        {(ogImageLink) => {
          if (!ogImageLink) {
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
  return <div className="h-full w-full animate-pulse bg-ghost-main-dark-bg" />;
};

const Error = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ghost-main-dark-bg">
      <span>Preview unavailabe</span>
    </div>
  );
};
