import { ServerDialog } from 'components/ServerDialog/ServerDialog';
import { SearchParams } from 'lib/types';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  searchParams: SearchParams;
}

export const Page = ({ children, searchParams }: Props) => {
  return (
    <>
      {children}
      <ServerDialog searchParams={searchParams} />
    </>
  );
};
