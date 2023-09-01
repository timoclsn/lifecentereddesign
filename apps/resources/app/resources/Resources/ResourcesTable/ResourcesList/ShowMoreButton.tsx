'use client';

import { Button } from 'design-system';
import { ArrowDown, Check, Loader } from 'lucide-react';
import { useFilter } from '../../../../../hooks/useFilter';

interface Props {
  moreToShow: boolean;
}

export const ShowMoreButton = ({ moreToShow }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const limit = parseInt(searchParams.get('limit') ?? '') || 10;
  return (
    <Button
      size="large"
      onClick={() => {
        const newLimit = limit + 10;
        handleValueChange('limit', newLimit.toString());
      }}
      disabled={!moreToShow}
    >
      {isPending && <Loader className="animate-spin" />}
      {!isPending && moreToShow && <ArrowDown />}
      {!isPending && !moreToShow && <Check />}
      {moreToShow ? 'Show more' : 'Showing all'}
    </Button>
  );
};
