'use client';

import { UilSpinnerAlt, UilTimesCircle } from '@iconscout/react-unicons';
import { Button } from 'design-system';
import { useFilter } from './useFilter';

export const ClearAllButton = () => {
  const { clearAll, isPending } = useFilter();
  return (
    <Button variant="outline" onClick={clearAll}>
      {isPending ? (
        <UilSpinnerAlt className="animate-spin" />
      ) : (
        <UilTimesCircle />
      )}
      Clear Filters
    </Button>
  );
};
