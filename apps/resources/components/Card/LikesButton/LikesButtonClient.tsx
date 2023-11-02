'use client';

import { useAuth } from '@clerk/nextjs';
import { cva } from 'class-variance-authority';
import { Tooltip } from 'design-system';
import { useAction } from 'lib/serverActions/client';
import { track } from 'lib/tracking';
import { Heart } from 'lucide-react';
import { useOptimistic } from 'react';
import { ContentType } from '../../../lib/resources';
import { SolidHeart } from '../../Icons/SolidHeart';
import { like, unLike } from '../actions';

const heartVariants = cva(
  'group-hover:scale-110 group-active:scale-90 transition-transform ease',
  {
    variants: {
      loading: {
        true: 'animate-pulse',
      },
      active: {
        true: 'text-red-700',
      },
    },
  },
);

interface Props {
  resourceId: number;
  resourceType: ContentType;
  resourceTitle: string;
  count: number;
  liked: boolean;
}

export const LikesButtonClient = ({
  resourceId,
  resourceType,
  resourceTitle,
  count,
  liked,
}: Props) => {
  const { isSignedIn } = useAuth();
  const { runAction: runLikeAction, isRunning: isLikeRunning } = useAction(
    like,
    {
      onRunAction: () => {
        updateOptimisticCount(optimisticCount + 1);
        if (isSignedIn) {
          updateOptimisticLiked(true);
        }
      },
      onSuccess: () => {
        track('Like resource', {
          type: resourceType,
          name: resourceTitle,
        });
      },
    },
  );
  const { runAction: runUnLikeAction, isRunning: isUnLikeRunning } = useAction(
    unLike,
    {
      onRunAction: () => {
        updateOptimisticCount(optimisticCount - 1);
        if (isSignedIn) {
          updateOptimisticLiked(false);
        }
      },
      onSuccess: () => {
        track('Un-like resource', {
          type: resourceType,
          name: resourceTitle,
        });
      },
    },
  );
  const isRunning = isLikeRunning || isUnLikeRunning;

  const [optimisticCount, updateOptimisticCount] = useOptimistic(
    count,
    (_, newState) => newState as number,
  );
  const [optimisticLiked, updateOptimisticLiked] = useOptimistic(
    liked,
    (_, newState) => newState as boolean,
  );

  const handleClick = async () => {
    if (liked) {
      await runUnLikeAction({
        id: resourceId,
        type: resourceType,
      });
    } else {
      await runLikeAction({
        id: resourceId,
        type: resourceType,
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={isRunning}
      className="ease group relative flex items-center justify-center gap-2 disabled:opacity-80"
    >
      <div className="animate-in slide-in-from-right-full fade-in transition-transform duration-100 ease-in">
        {optimisticCount}
      </div>
      <Tooltip
        content={
          isSignedIn
            ? optimisticLiked
              ? 'Remove resource from your favourites'
              : 'Like resource to show support and mark as favourite'
            : 'Like resource anonymously or sign-in to add resource to your favourites'
        }
        delayDuration={500}
      >
        <div>
          {optimisticLiked ? (
            <SolidHeart className={heartVariants({ active: true })} />
          ) : (
            <Heart className={heartVariants({ active: false })} />
          )}
        </div>
      </Tooltip>
    </button>
  );
};
