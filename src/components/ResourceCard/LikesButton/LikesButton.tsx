'use client';

import { useAuth } from '@clerk/nextjs';
import { action } from '@/api/action';
import { cva } from 'cva';
import { Tooltip } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { track } from '@/lib/tracking';
import { Heart } from 'lucide-react';
import { useOptimistic, useTransition } from 'react';
import { SolidHeart } from '../../Icons/SolidHeart';

const heartVariants = cva({
  base: 'group-hover:scale-110 group-active:scale-90 transition-transform ease',
  variants: {
    active: {
      true: 'text-red-700',
    },
  },
});

interface Props {
  id: string;
  count: number;
  liked: boolean;
}

export const LikesButton = ({ id, count, liked }: Props) => {
  const { isSignedIn } = useAuth();
  let [, startTransition] = useTransition();
  const { runAction: runLikeAction, isRunning: isLikeRunning } = useAction(
    action.resources.like,
    {
      onSuccess: () => {
        track('Like resource', { id });
      },
    },
  );
  const { runAction: runUnLikeAction, isRunning: isUnLikeRunning } = useAction(
    action.resources.unLike,
    {
      onSuccess: () => {
        track('Un-like resource', { id });
      },
    },
  );
  const isRunning = isLikeRunning || isUnLikeRunning;

  const [optimisticCount, setOptimisticCount] = useOptimistic(count);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(liked);

  const handleClick = async () => {
    startTransition(async () => {
      if (liked) {
        // Un-like
        setOptimisticCount(optimisticCount - 1);
        if (isSignedIn) {
          setOptimisticLiked(false);
        }
        await runUnLikeAction({ id });
      } else {
        // Like
        setOptimisticCount(optimisticCount + 1);
        if (isSignedIn) {
          setOptimisticLiked(true);
        }
        await runLikeAction({ id });
      }
    });
  };
  return (
    <button
      onClick={handleClick}
      disabled={isRunning}
      className="ease group relative flex items-center justify-center gap-2 disabled:opacity-80"
    >
      <div>{optimisticCount}</div>
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
