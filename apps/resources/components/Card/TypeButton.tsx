'use client';

import { Tag } from 'design-system';
import { Loader } from 'lucide-react';
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
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    const searchParamsType = searchParams.get('type');
    if (searchParamsType === type) {
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
          {isPending && <Loader className="animate-spin" />}
        </>,
      )}
    </button>
  );
};
