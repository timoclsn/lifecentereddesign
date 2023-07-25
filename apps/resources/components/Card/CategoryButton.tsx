'use client';

import { useFilter } from 'app/resources/useFilter';
import { Tag } from 'design-system';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const { handleValueChange, searchParams } = useFilter();

  return (
    <button
      onClick={() => {
        const searchParamsCategory = searchParams.get('category');
        if (searchParamsCategory === category) {
          handleValueChange('category', '');
          return;
        }
        handleValueChange('category', category);
      }}
      className="hover:opacity-80"
    >
      <Tag variant="light">{children}</Tag>
    </button>
  );
};
