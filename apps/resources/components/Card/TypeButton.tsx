'use client';

import { Loader } from 'lucide-react';
import { useResourcesTable } from 'app/resources/ResourcesTableProvider';
import { useFilter } from 'app/resources/useFilter';
import { Tag } from 'design-system';
import { ReactNode } from 'react';

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

  const getType = (type: ReactNode) => {
    if (inContext) {
      return (
        <button onClick={handleClick} className="hover:opacity-80">
          {type}
        </button>
      );
    }
    return type;
  };

  return getType(
    <Tag variant="outline">
      {children}
      {isPending && <Loader className="animate-spin" />}
    </Tag>
  );
};
