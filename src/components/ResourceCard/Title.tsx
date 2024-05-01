'use client';

import { Resource } from '@/data/resources/query';
import { Heading } from '@/design-system';
import { ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Props {
  children: string;
  slug: Resource['slug'];
}

export const Title = ({ children, slug }: Props) => {
  const pathname = usePathname();
  const isDetailPage = pathname === `/resources/${slug}`;
  return (
    <Heading
      level="3"
      title={children}
      className="group-hover/card:pointer-events-none group-hover/card:cursor-pointer group-hover/card:underline"
    >
      {children}
      {isDetailPage && (
        <span>
          {' '}
          <ExternalLink size={18} className="inline align-baseline" />
        </span>
      )}
    </Heading>
  );
};
