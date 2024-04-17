'use client';

import { Text } from '@/design-system';
import { usePathname } from 'next/navigation';

interface Props {
  children: string;
  slug: string;
}

export const Details = ({ children, slug }: Props) => {
  const pathname = usePathname();
  const isDetailPage = pathname === `/resources/${slug}`;

  if (!isDetailPage) {
    return null;
  }

  return <Text className="text-text-secondary">{children}</Text>;
};
