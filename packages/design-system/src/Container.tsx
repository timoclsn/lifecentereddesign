import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  inset?: boolean;
  className?: string;
}

export const Container = ({ children, inset, className }: Props) => {
  const styles = clsx(
    'mx-auto max-w-screen-2xl w-full',
    inset && 'px-6 sm:px-8',
    className
  );
  return <div className={styles}>{children}</div>;
};
