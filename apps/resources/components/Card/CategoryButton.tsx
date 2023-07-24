'use client';

import { Tag } from 'design-system';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  category: string;
}

export const CategoryButton = ({ children, category }: Props) => {
  const nextSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams.toString());

  const { replace } = useRouter();
  const pathname = usePathname();

  const filter = () => {
    const searchParamsString = searchParams.toString();
    replace(`${pathname}${searchParamsString ? '?' : ''}${searchParamsString}`);
  };

  const handleValueChange = (param: string, value: string) => {
    searchParams.set(param, value);
    filter();
  };
  return (
    <button
      onClick={() => {
        const searchParamsCategory = searchParams.get('category');
        if (searchParamsCategory === category) {
          searchParams.delete('category');
          filter();
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
