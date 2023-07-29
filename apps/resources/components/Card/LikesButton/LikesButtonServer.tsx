import { auth } from '@clerk/nextjs';
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
    liked: userId ? newLikes.some((like) => like.userId === userId) : false,
  };
};

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
  const { count, liked } = await getLikesData(resourceId, resourceType);

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
