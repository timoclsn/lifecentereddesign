'use client';

import { ContentType } from 'lib/resources';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  resourceLink?: string;
}

export const DetailsLink = ({
  resourceId,
  resourceType,
  resourceLink,
}: Props) => {
  const pathname = usePathname();
  const isDetailPage = pathname === `/resources/${resourceType}-${resourceId}`;
  if (isDetailPage && !resourceLink) return null;
  if (isDetailPage && resourceLink) {
    return (
      <Link
        href={resourceLink}
        target="_blank"
        rel="noopener"
        className="absolute inset-0"
      />
    );
  }

  return (
    <Link
      href={`/resources/${resourceType}-${resourceId}`}
      className="absolute inset-0"
    />
  );
};
