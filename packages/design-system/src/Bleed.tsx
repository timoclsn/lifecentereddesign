import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Bleed = ({ children }: Props) => {
  return <div className="ml-[calc(50%-50vw)] w-screen">{children}</div>;
};
