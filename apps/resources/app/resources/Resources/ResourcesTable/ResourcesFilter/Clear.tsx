'use client';

import { Tooltip } from 'design-system';
import { XCircle } from 'lucide-react';
import { useFilter } from '../../../../../hooks/useFilter';

export const Clear = () => {
  const { isFiltered, clearAll } = useFilter();

  return (
    <Tooltip content="Clear all filter" delayDuration={500}>
      <button
        disabled={!isFiltered}
        onClick={clearAll}
        className="ease transition-transform hover:scale-110 active:scale-90 disabled:scale-100 disabled:opacity-50"
      >
        <XCircle />
        <span className="sr-only">Clear filters</span>
      </button>
    </Tooltip>
  );
};
