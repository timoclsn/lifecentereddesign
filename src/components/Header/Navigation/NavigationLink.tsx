'use client';

import { Text } from '@/design-system';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
}

export const NavigationLink = ({ children, href }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={href} className="transition-colors hover:text-text-secondary">
      <Text weight={pathname.startsWith(href) ? 'bold' : 'normal'}>
        {children}
      </Text>
    </Link>
  );
};
