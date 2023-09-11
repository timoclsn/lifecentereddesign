'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ContentType } from '../../lib/resources';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const DetailsLink = ({ resourceId, resourceType }: Props) => {
  const pathname = usePathname();
  if (pathname === `/resources/${resourceType}-${resourceId}`) return null;
  return (
    <Link
      href={`/resources/${resourceType}-${resourceId}`}
      className="absolute inset-0"
    />
  );
};
