'use client';

import { Tag } from 'design-system';
import { Loader } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleClick = () => {
    if (pathname !== '/resources') {
      push(`/resources?category=${category}`);
      return;
    }

    const searchParamsCategory = searchParams.get('category');
    if (searchParamsCategory === category) {
      handleValueChange('category', '');
      return;
    }
    handleValueChange('category', category);
  };

  return (
    <button onClick={handleClick} className="hover:opacity-80">
      <Tag variant="light">
        {children}
        {isPending && <Loader className="animate-spin" />}
      </Tag>
    </button>
  );
};
