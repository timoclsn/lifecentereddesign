'use client';

import { Filter, Loader2 } from 'lucide-react';
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
      <Link
        href={`/resources?topic=${topic}#resources`}
        className="inline-flex items-center justify-center gap-0.5 hover:opacity-80 "
      >
        {children}
        <Filter size={12} />
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-0.5 hover:opacity-80"
    >
      {children}
      {!isPending && <Filter size={12} />}
      {isPending && <Loader2 size={12} className="animate-spin" />}
    </button>
  );
};
