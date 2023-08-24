'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { ContentType } from '../../../lib/resources';

interface Props {
  children: ReactNode;
  resourceId: number;
  resourceType: ContentType;
}

export const CommentsLink = ({ children, resourceId, resourceType }: Props) => {
  const pathname = usePathname();
  const resourceDetailPath = `/resources/${resourceType}-${resourceId}`;

  if (pathname === resourceDetailPath) {
    return <>{children}</>;
  }

  return (
    <Link href={resourceDetailPath} className="group">
      {children}
    </Link>
  );
};
