'use client';

import { ArrowDown, Loader } from 'lucide-react';
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
      {isPending ? <Loader className="animate-spin" /> : <ArrowDown />}
      Show More
    </Button>
  );
};
