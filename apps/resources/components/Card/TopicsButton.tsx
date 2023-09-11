'use client';

import { Tooltip } from 'design-system';
import { Filter, Loader2, XCircle } from 'lucide-react';
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
  const searchParamsTopic = searchParams.get('topic');
  const isFiltered = searchParamsTopic === topic;
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    if (isFiltered) {
      handleValueChange('topic', '');
      return;
    }
    handleValueChange('topic', topic);
  };

  if (!inContext) {
    return (
      <Link
        href={`/resources?topic=${topic}#resources`}
        className="relative inline-flex items-center justify-center gap-0.5 hover:opacity-80"
      >
        {children}
        <Filter size={12} />
      </Link>
    );
  }

  return (
    <Tooltip
      content={
        !isFiltered ? `Filter by topic: ${children}` : 'Clear topic filter'
      }
      delayDuration={500}
    >
      <button
        onClick={handleClick}
        className="relative inline-flex items-center justify-center gap-0.5 hover:opacity-80"
      >
        {children}
        {isPending && <Loader2 size={12} className="animate-spin" />}
        {!isPending && !isFiltered && <Filter size={12} />}
        {!isPending && isFiltered && <XCircle size={12} />}
      </button>
    </Tooltip>
  );
};
