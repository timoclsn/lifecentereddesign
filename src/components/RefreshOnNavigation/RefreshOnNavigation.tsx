'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RefreshOnNavigation = () => {
  const { refresh } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    refresh();
  }, [pathname, refresh]);

  return null;
};
