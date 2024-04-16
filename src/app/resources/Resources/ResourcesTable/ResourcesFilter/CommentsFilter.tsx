'use client';

import * as Toggle from '@radix-ui/react-toggle';
import { Tooltip } from '@/components/design-system';
import { Loader2, MessageCircle } from 'lucide-react';
import { SolidMessageCircle } from '../../../../../components/Icons/SolidMessageCircle';
import { useFilter } from '../../../../../hooks/useFilter';

interface Props {
  commentedResourcesCount: number;
}

export const CommentsFilter = ({ commentedResourcesCount }: Props) => {
  const { searchParams, handleValueChange, filter, isPending } = useFilter();
  const filterByLikes = searchParams.get('commented') === 'true';

  return (
    <div className="flex items-center justify-center gap-1">
      <Tooltip
        content={
          filterByLikes
            ? 'Show all resources'
            : `Only show ${commentedResourcesCount} commented resource${
                commentedResourcesCount > 1 ? 's' : ''
              }`
        }
        delayDuration={500}
      >
        <Toggle.Root
          aria-label="Filter by comments"
          disabled={isPending}
          className="ease text-text-primary flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
          onPressedChange={() => {
            if (filterByLikes) {
              searchParams.delete('commented');
              filter();
              return;
            }
            handleValueChange('commented', 'true');
          }}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {!isPending && filterByLikes && <SolidMessageCircle />}
          {!isPending && !filterByLikes && <MessageCircle />}
        </Toggle.Root>
      </Tooltip>
      {commentedResourcesCount}
    </div>
  );
};
