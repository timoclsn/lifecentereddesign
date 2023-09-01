'use client';

import { Tooltip } from 'design-system';
import { Loader2, XCircle } from 'lucide-react';
import { useFilter } from '../../../../../hooks/useFilter';

export const Clear = () => {
  const { isFiltered, clearAll, isPending } = useFilter();

  return (
    <Tooltip content="Clear all filter" delayDuration={500}>
      <button
        disabled={!isFiltered}
        onClick={clearAll}
        className="ease transition-transform hover:scale-110 active:scale-90 disabled:scale-100 disabled:opacity-50"
      >
        {isPending && <Loader2 className="animate-spin" />}
        {!isPending && <XCircle />}
        <span className="sr-only">Clear filters</span>
      </button>
    </Tooltip>
  );
};
