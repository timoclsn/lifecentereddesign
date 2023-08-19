'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  timeout?: number;
}

export const RefreshOnNavigation = ({ timeout = 0 }: Props) => {
  const { refresh } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refresh();
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, refresh, timeout]);

  return null;
};
