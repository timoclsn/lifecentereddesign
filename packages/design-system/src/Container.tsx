import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 sm:px-8">{children}</div>
  );
}
