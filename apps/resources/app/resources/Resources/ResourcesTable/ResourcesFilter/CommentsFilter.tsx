'use client';

import * as Toggle from '@radix-ui/react-toggle';
import { Tooltip } from 'design-system';
import { Loader2, MessageCircle } from 'lucide-react';
import { SolidMessageCircle } from '../../../../../components/Icons/SolidMessageCircle';
import { useFilter } from '../../../../../hooks/useFilter';
import { CommentedResources } from '../../../../../lib/resources';

interface Props {
  commentedResources: CommentedResources;
}

export const CommentsFilter = ({ commentedResources }: Props) => {
  const { searchParams, handleValueChange, filter, isPending } = useFilter();
  const filterByLikes = searchParams.get('comments') === 'true';
  const commentedResourcesCount = commentedResources.length;

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
              searchParams.delete('comments');
              filter();
              return;
            }
            handleValueChange('comments', 'true');
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
