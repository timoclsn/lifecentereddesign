'use client';

import { UilTimesCircle } from '@iconscout/react-unicons';
import { Tooltip } from 'design-system';
import { useFilter } from './useFilter';

export const Clear = () => {
  const { isFiltered, clearAll } = useFilter();

  return (
    <Tooltip content="Clear all filter" delayDuration={500}>
      <button
        disabled={!isFiltered}
        onClick={clearAll}
        className="ease transition-transform hover:scale-110 active:scale-90 disabled:scale-100 disabled:opacity-50"
      >
        <UilTimesCircle />
        <span className="sr-only">Clear filters</span>
      </button>
    </Tooltip>
  );
};
