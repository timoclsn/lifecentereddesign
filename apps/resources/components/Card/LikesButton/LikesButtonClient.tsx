'use client';

import { useAuth } from '@clerk/nextjs';
import { cva } from 'class-variance-authority';
import { Tooltip } from 'design-system';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { experimental_useOptimistic as useOptimistic } from 'react';
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
  }
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
  const { refresh } = useRouter();

  const [optimisticCount, updateOptimisticCount] = useOptimistic(
    count,
    (_, newState) => newState as number
  );
  const [optimisticLiked, updateOptimisticLiked] = useOptimistic(
    liked,
    (state, newState) => newState as boolean
  );

  const isLoading = optimisticCount !== count;

  const handleClick = async () => {
    if (liked) {
      updateOptimisticCount(optimisticCount - 1);
      if (isSignedIn) {
        updateOptimisticLiked(false);
      }
      await unLike({
        id: resourceId,
        type: resourceType,
      });
      splitbee.track('Un-like resource', {
        type: resourceType,
        name: resourceTitle,
      });
    } else {
      updateOptimisticCount(optimisticCount + 1);
      if (isSignedIn) {
        updateOptimisticLiked(true);
      }
      await like({
        id: resourceId,
        type: resourceType,
      });
      splitbee.track('Like resource', {
        type: resourceType,
        name: resourceTitle,
      });
    }

    refresh();
  };
  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="ease group flex items-center justify-center gap-2 disabled:opacity-80"
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
