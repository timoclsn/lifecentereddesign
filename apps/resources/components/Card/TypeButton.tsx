'use client';

import { Tag } from 'design-system';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  type: string;
}

export const TypeButton = ({ children, type }: Props) => {
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
        const searchParamsType = searchParams.get('type');
        if (searchParamsType === type) {
          searchParams.delete('type');
          filter();
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
