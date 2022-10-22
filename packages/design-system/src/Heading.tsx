import clsx from 'clsx';
import { ReactNode } from 'react';

const validElements = ['h1', 'h2', 'h3', 'h4', 'span'] as const;
type ValidElements = typeof validElements[number];

const levels = {
  '1': 'text-3xl sm:text-7xl',
  '2': 'text-4xl',
  '3': 'text-xl sm:text-3xl',
  '4': 'text-2xl',
  '5': 'text-base',
} as const;

interface Props {
  children: ReactNode;
  as?: ValidElements;
  level?: keyof typeof levels;
  title?: string;
  uppercase?: boolean;
  className?: string;
}

export const Heading = ({
  children,
  as,
  level = '2',
  title,
  uppercase,
  className,
}: Props) => {
  const Element = as ? as : (`h${level}` as ValidElements);
  const styles = clsx(
    'font-serif font-bold',
    levels[level],
    uppercase && 'uppercase',
    className
  );
  return (
    <Element title={title} className={styles}>
      {children}
    </Element>
  );
};
