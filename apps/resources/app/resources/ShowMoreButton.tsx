'use client';

import { UilArrowDown, UilSpinnerAlt } from '@iconscout/react-unicons';
import { Button } from 'design-system';
import { useFilter } from './useFilter';

export const ShowMoreButton = () => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const limit = parseInt(searchParams.get('limit') ?? '') || 10;
  return (
    <Button
      size="large"
      onClick={() => {
        const newLimit = limit + 10;
        handleValueChange('limit', newLimit.toString());
      }}
    >
      {isPending ? (
        <UilSpinnerAlt className="animate-spin" />
      ) : (
        <UilArrowDown />
      )}
      Show More
    </Button>
  );
};
