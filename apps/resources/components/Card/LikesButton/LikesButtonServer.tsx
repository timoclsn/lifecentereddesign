import { auth } from '@clerk/nextjs';
import {
  ContentType,
  getResourceNewLikes,
  getResourceOldLikesCount,
} from 'lib/resources';
import { unstable_cache as cache } from 'next/cache';
import { LikesButtonClient } from './LikesButtonClient';

const getLikesData = async (resourceId: number, resourceType: ContentType) => {
  const { userId } = auth();
  const [oldLikesCount, newLikes] = await Promise.all([
    getResourceOldLikesCount(resourceId, resourceType),
    getResourceNewLikes(resourceId, resourceType),
  ]);

  const newLikesCount = newLikes.length;

  return {
    count: oldLikesCount + newLikesCount,
    liked: newLikes.some((like) => like.userId === userId),
  };
};

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const LikesButtonServer = async ({
  resourceId,
  resourceType,
}: Props) => {
  const { count, liked } = await cache(getLikesData, undefined, {
    tags: [`likes-${resourceId}-${resourceType}`],
  })(resourceId, resourceType);

  return (
    <LikesButtonClient
      resourceId={resourceId}
      resourceType={resourceType}
      count={count}
      liked={liked}
    />
  );
};
