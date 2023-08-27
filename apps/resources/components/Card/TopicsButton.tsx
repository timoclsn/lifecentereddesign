'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useResourcesTable } from '../../app/resources/Resources/ResourcesTable/ResourcesTableProvider';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  topic: string;
}

export const TopicsButton = ({ children, topic }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    const searchParamsType = searchParams.get('topic');
    if (searchParamsType === topic) {
      handleValueChange('topic', '');
      return;
    }
    handleValueChange('topic', topic);
  };

  if (!inContext) {
    return (
      <Link href={`/resources?topic=${topic}`} className="hover:opacity-80">
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`hover:opacity-80${isPending ? ' animate-pulse' : ''}`}
    >
      {children}
    </button>
  );
};
