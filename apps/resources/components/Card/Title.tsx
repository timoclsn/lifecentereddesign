'use client';

import { Heading } from 'design-system';
import { ContentType } from 'lib/resources';
import { ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Props {
  children: string;
  resourceId: number;
  resourceType: ContentType;
  resourceLink?: string;
}

export const Title = ({
  children,
  resourceId,
  resourceType,
  resourceLink,
}: Props) => {
  const pathname = usePathname();
  const isDetailPage = pathname === `/resources/${resourceType}-${resourceId}`;

  const showExternalLinkIcon = isDetailPage && resourceLink;
  return (
    <Heading
      level="3"
      title={children}
      className="group-hover/card:pointer-events-none group-hover/card:cursor-pointer group-hover/card:underline"
    >
      {children}
      {showExternalLinkIcon && (
        <span>
          {' '}
          <ExternalLink size={18} className="inline align-baseline" />
        </span>
      )}
    </Heading>
  );
};
