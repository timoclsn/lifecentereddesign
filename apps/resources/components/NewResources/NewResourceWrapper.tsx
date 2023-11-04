'use client';

import { track } from 'lib/tracking';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const NewResourceWrapper = ({ children }: Props) => {
  return (
    <li
      className="relative w-[330px] flex-none snap-center sm:w-[600px]"
      onClick={() => {
        track('New resource clicked');
      }}
    >
      {children}
    </li>
  );
};
