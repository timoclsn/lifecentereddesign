'use client';

import { Tag } from 'design-system';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useResourcesTable } from '../../app/resources/Resources/ResourcesTable/ResourcesTableProvider';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    const searchParamsCategory = searchParams.get('category');
    if (searchParamsCategory === category) {
      handleValueChange('category', '');
      return;
    }
    handleValueChange('category', category);
  };

  const tag = (children: ReactNode) => <Tag variant="light">{children}</Tag>;

  if (!inContext) {
    return (
      <Link
        href={`/resources?category=${category}#resources`}
        className="hover:opacity-80"
      >
        {tag(children)}
      </Link>
    );
  }

  return (
    <button onClick={handleClick} className="hover:opacity-80">
      {tag(
        <>
          {children}
          {isPending && <Loader2 className="animate-spin" />}
        </>,
      )}
    </button>
  );
};
