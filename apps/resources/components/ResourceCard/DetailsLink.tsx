'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  slug: string;
  link: string;
}

export const DetailsLink = ({ slug, link }: Props) => {
  const pathname = usePathname();
  const detailsPath = `/resources/${slug}`;
  const isDetailPage = pathname === detailsPath;
  if (isDetailPage) {
    return (
      <Link
        href={link}
        target="_blank"
        rel="noopener"
        className="absolute inset-0"
      />
    );
  }

  return <Link href={detailsPath} className="absolute inset-0" />;
};
