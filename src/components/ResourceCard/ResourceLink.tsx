'use client';

import { cx } from 'cva';
import { track } from '@/lib/tracking';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Resource } from '@/data/resources/query';

interface Props {
  children: ReactNode;
  id: Resource['id'];
  link: Resource['link'];
  className?: string;
}

export const ResourceLink = ({ children, id, link, className }: Props) => {
  return (
    <Link
      href={link}
      prefetch={false}
      target="_blank"
      rel="noopener"
      className={cx('relative hover:opacity-80', className)}
      onClick={() => {
        track('Open resource', { id });
      }}
    >
      {children}
    </Link>
  );
};
