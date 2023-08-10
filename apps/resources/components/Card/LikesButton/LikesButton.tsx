import { auth } from '@clerk/nextjs';
import {
  ContentType,
  getResourceNewLikes,
  getResourceOldLikesCount,
} from '../../../lib/resources';
import { LikesButtonClient } from './LikesButtonClient';
import { Heart } from 'lucide-react';
import { Await } from '../../Await/Await';

const getLikesData = async (resourceId: number, resourceType: ContentType) => {
  const { userId } = auth();
  const [oldLikesCount, newLikes] = await Promise.all([
    getResourceOldLikesCount(resourceId, resourceType),
    getResourceNewLikes(resourceId, resourceType),
  ]);

  const newLikesCount = newLikes.length;

  return {
    count: oldLikesCount + newLikesCount,
    liked: userId ? newLikes.some((like) => like.userId === userId) : false,
  };
};

interface Props {
  resourceId: number;
  resourceType: ContentType;
  resourceTitle: string;
}

export const LikesButton = async ({
  resourceId,
  resourceType,
  resourceTitle,
}: Props) => {
  const promise = getLikesData(resourceId, resourceType);
  return (
    <Await promise={promise} loading={<Loading />}>
      {({ count, liked }) => (
        <LikesButtonClient
          resourceId={resourceId}
          resourceType={resourceType}
          resourceTitle={resourceTitle}
          count={count}
          liked={liked}
        />
      )}
    </Await>
  );
};

const Loading = () => {
  return (
    <div className="ease group flex items-center justify-center gap-2 disabled:opacity-80">
      <div>
        <Heart className="animate-pulse" />
      </div>
    </div>
  );
};
