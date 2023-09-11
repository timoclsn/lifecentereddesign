'use client';

import { ContentType } from 'lib/resources';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  resourceId: number;
  resourceType: ContentType;
}

export const HoverProvider = ({
  children,
  resourceId,
  resourceType,
}: Props) => {
  const pathname = usePathname();
  if (pathname === `/resources/${resourceType}-${resourceId}`) return children;
  return <div className="group/card h-full w-full">{children}</div>;
};
