'use client';

import { Tag } from 'design-system';
import { Loader } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { useFilter } from '../../hooks/useFilter';

interface Props {
  children: ReactNode;
  type: string;
}

export const TypeButton = ({ children, type }: Props) => {
  const { handleValueChange, searchParams, isPending } = useFilter();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleClick = () => {
    if (pathname !== '/resources') {
      push(`/resources?type=${type}`);
      return;
    }

    const searchParamsType = searchParams.get('type');
    if (searchParamsType === type) {
      handleValueChange('type', '');
      return;
    }
    handleValueChange('type', type);
  };

  return (
    <button onClick={handleClick} className="hover:opacity-80">
      <Tag variant="outline">
        {children}
        {isPending && <Loader className="animate-spin" />}
      </Tag>
    </button>
  );
};
