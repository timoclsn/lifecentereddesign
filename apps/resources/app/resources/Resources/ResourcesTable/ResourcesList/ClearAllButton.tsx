'use client';

import { Button } from 'design-system';
import { Loader, XCircle } from 'lucide-react';
import { useFilter } from '../../../../../hooks/useFilter';

export const ClearAllButton = () => {
  const { clearAll, isPending } = useFilter();
  return (
    <Button variant="outline" onClick={clearAll}>
      {isPending ? <Loader className="animate-spin" /> : <XCircle />}
      Clear Filters
    </Button>
  );
};
