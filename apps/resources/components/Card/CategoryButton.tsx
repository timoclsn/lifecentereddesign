'use client';

import { Tag, Tooltip } from 'design-system';
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
  const searchParamsCategory = searchParams.get('category');
  const isFiltered = searchParamsCategory === category;
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    if (isFiltered) {
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
        className="relative hover:opacity-80"
      >
        {tag(children)}
      </Link>
    );
  }

  return (
    <Tooltip
      content={
        !isFiltered
          ? `Filter by category: ${children}`
          : 'Clear category filter'
      }
      delayDuration={500}
    >
      <button onClick={handleClick} className="relative hover:opacity-80">
        {tag(
          <>
            {children}
            {isPending && <Loader2 className="animate-spin" />}
          </>,
        )}
      </button>
    </Tooltip>
  );
};
