'use client';

import { cx } from 'cva';
import { ContentType } from 'lib/resources';
import { track } from 'lib/tracking';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
  resourceType: ContentType;
  resourceTitle: string;
  className?: string;
}

export const ResourceLink = ({
  children,
  href,
  resourceTitle,
  resourceType,
  className,
}: Props) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener"
      className={cx('relative hover:opacity-80', className)}
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
