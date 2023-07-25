'use client';

import { UilHeart } from '@iconscout/react-unicons';
import * as Toggle from '@radix-ui/react-toggle';
import { Tooltip } from 'design-system';
import { LikedResources } from 'lib/resources';
import { SolidHeart } from '../../components/Icons/SolidHeart';
import { useFilter } from './useFilter';

interface Props {
  likedResources: LikedResources;
}

export const LikeFilter = ({ likedResources }: Props) => {
  const { searchParams, handleValueChange, filter } = useFilter();
  const filterByLikes = searchParams.get('likes') === 'true';
  const likedResourcesCount = likedResources.length;

  return (
    <div className="flex items-center justify-center gap-1">
      <Tooltip
        content={
          filterByLikes
            ? 'Show all resources'
            : `Only show ${likedResourcesCount} liked resources`
        }
        delayDuration={500}
      >
        <Toggle.Root
          aria-label="Filter by likes"
          className="ease text-text-primary flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
          onPressedChange={() => {
            if (filterByLikes) {
              searchParams.delete('likes');
              filter();
              return;
            }
            handleValueChange('likes', 'true');
          }}
        >
          {filterByLikes ? <SolidHeart /> : <UilHeart />}
        </Toggle.Root>
      </Tooltip>
      {likedResourcesCount}
    </div>
  );
};
