import { auth } from '@clerk/nextjs';
import { unstable_cache as cache } from 'next/cache';
import {
  ContentType,
  getResourceNewLikes,
  getResourceOldLikesCount,
} from '../../../lib/resources';
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

export const likesDataTag = (resourceId: number, resourceType: ContentType) =>
  `likes-${resourceId}-${resourceType}`;

interface Props {
  resourceId: number;
  resourceType: ContentType;
  resourceTitle: string;
}

export const LikesButtonServer = async ({
  resourceId,
  resourceType,
  resourceTitle,
}: Props) => {
  const tag = likesDataTag(resourceId, resourceType);
  const { count, liked } = await cache(getLikesData, undefined, {
    tags: [tag],
  })(resourceId, resourceType);

  return (
    <LikesButtonClient
      resourceId={resourceId}
      resourceType={resourceType}
      resourceTitle={resourceTitle}
      count={count}
      liked={liked}
    />
  );
};
