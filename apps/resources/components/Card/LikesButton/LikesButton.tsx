import { auth } from '@clerk/nextjs/server';
import { query } from 'api/query';
import { ContentType } from 'lib/resources';
import { Heart } from 'lucide-react';
import { Await } from '../../Await/Await';
import { LikesButtonClient } from './LikesButtonClient';

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
  const { userId } = auth();
  const promise = query.resources.getResourceLikesData({
    id: resourceId,
    type: resourceType,
  });
  return (
    <Await promise={promise} loading={<Loading />}>
      {({ newLikes, oldLikesCount }) => {
        const count = oldLikesCount + newLikes.length;
        const liked = userId
          ? newLikes.some((like) => like.userId === userId)
          : false;
        return (
          <LikesButtonClient
            resourceId={resourceId}
            resourceType={resourceType}
            resourceTitle={resourceTitle}
            count={count}
            liked={liked}
          />
        );
      }}
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
