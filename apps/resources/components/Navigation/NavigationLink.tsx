'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Text } from 'design-system';
import { usePathname } from 'next/navigation';

interface Props {
  children: ReactNode;
  href: string;
}

export const NavigationLink = ({ children, href }: Props) => {
  const pathname = usePathname();
  return (
    <Link href={href} className="hover:text-text-secondary transition-colors">
      <Text weight={pathname.includes(href) ? 'bold' : 'normal'}>
        {children}
      </Text>
    </Link>
  );
};
