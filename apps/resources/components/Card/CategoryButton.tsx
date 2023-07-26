'use client';

import { useResourcesTable } from 'app/resources/ResourcesTableProvider';
import { useFilter } from 'app/resources/useFilter';
import { Tag } from 'design-system';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const { handleValueChange, searchParams } = useFilter();
  const { inContext } = useResourcesTable();

  const handleClick = () => {
    const searchParamsCategory = searchParams.get('category');
    if (searchParamsCategory === category) {
      handleValueChange('category', '');
      return;
    }
    handleValueChange('category', category);
  };

  const getCategory = (category: ReactNode) => {
    if (inContext) {
      return (
        <button onClick={handleClick} className="hover:opacity-80">
          {category}
        </button>
      );
    }
    return category;
  };

  return getCategory(<Tag variant="light">{children}</Tag>);
};
