'use client';

import { Tag, Tooltip } from 'design-system';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useResourcesTable } from '../../app/resources/Resources/ResourcesTable/ResourcesTableProvider';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  type: string;
}

export const TypeButton = ({ children, type }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
  const searchParamsType = searchParams.get('type');
  const isFiltered = searchParamsType === type;
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    if (isFiltered) {
      handleValueChange('type', '');
      return;
    }
    handleValueChange('type', type);
  };

  const tag = (children: ReactNode) => <Tag variant="outline">{children}</Tag>;

  if (!inContext) {
    return (
      <Link
        href={`/resources?type=${type}#resources`}
        className="relative hover:opacity-80"
      >
        {tag(children)}
      </Link>
    );
  }

  return (
    <Tooltip
      content={
        !isFiltered ? `Filter by type: ${children}` : 'Clear type filter'
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
