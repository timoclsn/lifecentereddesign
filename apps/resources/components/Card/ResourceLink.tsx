'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { ContentType } from '../../lib/resources';

interface Props {
  children: ReactNode;
  href: string;
  resourceType: ContentType;
  resourceTitle: string;
}

export const ResourceLink = ({
  children,
  href,
  resourceTitle,
  resourceType,
}: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className="relative hover:opacity-80"
      onClick={() => {
        splitbee.track('Open resource', {
          type: resourceType,
          name: resourceTitle,
        });
      }}
    >
      {children}
    </Link>
  );
};
