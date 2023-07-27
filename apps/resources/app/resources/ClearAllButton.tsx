'use client';

import { Loader, XCircle } from 'lucide-react';
import { Button } from 'design-system';
import { useFilter } from './useFilter';

export const ClearAllButton = () => {
  const { clearAll, isPending } = useFilter();
  return (
    <Button variant="outline" onClick={clearAll}>
      {isPending ? <Loader className="animate-spin" /> : <XCircle />}
      Clear Filters
    </Button>
  );
};
