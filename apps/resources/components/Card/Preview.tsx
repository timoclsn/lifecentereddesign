import { query } from 'api/query';
import { Await } from 'components/Await/Await';
import { ContentType } from 'lib/resources';
import Image from 'next/image';

interface Props {
  url: string;
  resourceId: number;
  resourceType: ContentType;
}

export const Preview = ({ url, resourceId, resourceType }: Props) => {
  const promise = query.resources.getOgImageLink({
    id: resourceId,
    type: resourceType,
    url,
  });

  return (
    <div className="bg-ghost-main-dark-bg @3xl:w-[300px] @5xl:w-[500px] relative -z-10 aspect-video w-full flex-none">
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
  return <div className="bg-ghost-main-dark-bg h-full w-full animate-pulse" />;
};

const Error = () => {
  return (
    <div className="bg-ghost-main-dark-bg flex h-full w-full items-center justify-center">
      <span>Preview unavailabe</span>
    </div>
  );
};
