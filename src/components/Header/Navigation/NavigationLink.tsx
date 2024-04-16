'use client';

import { Text } from '@/components/design-system';
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
    <Link href={href} className="hover:text-text-secondary transition-colors">
      <Text weight={pathname.startsWith(href) ? 'bold' : 'normal'}>
        {children}
      </Text>
    </Link>
  );
};
