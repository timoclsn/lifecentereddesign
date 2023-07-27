'use client';

import { Tag } from 'design-system';
import { Loader } from 'lucide-react';
import { ReactNode } from 'react';
import { useResourcesTable } from '../../app/resources/Resources/ResourcesTable/ResourcesTableProvider';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
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

  return getCategory(
    <Tag variant="light">
      {children}
      {isPending && <Loader className="animate-spin" />}
    </Tag>
  );
};
