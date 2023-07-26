import { UilHeart } from '@iconscout/react-unicons';
import { ContentType } from 'lib/resources';
import { Suspense } from 'react';
import { LikesButtonServer } from './LikesButtonServer';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  resourceTitle: string;
}

export const LikesButton = ({
  resourceId,
  resourceType,
  resourceTitle,
}: Props) => {
  return (
    <Suspense fallback={<Loading />}>
      <LikesButtonServer
        resourceId={resourceId}
        resourceType={resourceType}
        resourceTitle={resourceTitle}
      />
    </Suspense>
  );
};

const Loading = () => {
  return (
    <div className="ease group flex items-center justify-center gap-2 disabled:opacity-80">
      <div>
        <UilHeart className="animate-pulse" />
      </div>
    </div>
  );
};
