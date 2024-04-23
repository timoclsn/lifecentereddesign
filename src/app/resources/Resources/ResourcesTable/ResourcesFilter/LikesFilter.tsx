'use client';

import * as Toggle from '@radix-ui/react-toggle';
import { Tooltip } from '@/design-system';
import { Heart, Loader2 } from 'lucide-react';
import { SolidHeart } from '../../../../../components/Icons/SolidHeart';
import { useFilter } from '../../../../../hooks/useFilter';

interface Props {
  likedResourcesCount: number;
}

export const LikesFilter = ({ likedResourcesCount }: Props) => {
  const { searchParams, handleValueChange, filter, isPending } = useFilter();
  const filterByLikes = searchParams.get('liked') === 'true';

  return (
    <div className="flex items-center justify-center gap-1">
      <Tooltip
        content={
          filterByLikes
            ? 'Show all resources'
            : `Only show ${likedResourcesCount} liked resource${
                likedResourcesCount > 1 ? 's' : ''
              }`
        }
        delayDuration={500}
      >
        <Toggle.Root
          aria-label="Filter by likes"
          disabled={isPending}
          className="ease flex items-center justify-center text-text-primary transition-transform hover:scale-110 active:scale-90"
          onPressedChange={() => {
            if (filterByLikes) {
              searchParams.delete('liked');
              filter();
              return;
            }
            handleValueChange('liked', 'true');
          }}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {!isPending && filterByLikes && <SolidHeart />}
          {!isPending && !filterByLikes && <Heart />}
        </Toggle.Root>
      </Tooltip>
      {likedResourcesCount}
    </div>
  );
};
