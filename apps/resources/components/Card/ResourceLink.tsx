'use client';

import { ContentType } from 'data/resources/query';
import { track } from 'lib/tracking';
import Link from 'next/link';
import { ReactNode } from 'react';

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
        track('Open resource', {
          type: resourceType,
          name: resourceTitle,
        });
      }}
    >
      {children}
    </Link>
  );
};
