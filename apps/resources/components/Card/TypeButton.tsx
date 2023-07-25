'use client';

import { useFilter } from 'app/resources/useFilter';
import { Tag } from 'design-system';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: string;
}

export const TypeButton = ({ children, type }: Props) => {
  const { handleValueChange, searchParams } = useFilter();

  return (
    <button
      onClick={() => {
        const searchParamsType = searchParams.get('type');
        if (searchParamsType === type) {
          handleValueChange('type', '');
          return;
        }
        handleValueChange('type', type);
      }}
      className="hover:opacity-80"
    >
      <Tag variant="outline">{children}</Tag>
    </button>
  );
};
