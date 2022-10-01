import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

const validElements = ['h1', 'h2', 'h3', 'h4', 'span'] as const;
type ValidElements = typeof validElements[number];

const levels = {
  '1': 'text-3xl sm:text-7xl',
  '2': 'text-4xl',
  '3': 'text-xl sm:text-3xl',
  '4': 'text-2xl',
} as const;

interface Props {
  children: ReactNode;
  as?: ValidElements;
  level?: keyof typeof levels;
  title?: string;
  className?: string;
}

export const Heading = ({
  children,
  as,
  level = '2',
  title,
  className,
}: Props) => {
  const Element = as ? as : (`h${level}` as ValidElements);
  const styles = cx(['font-serif font-bold', levels[level], className]);
  return (
    <Element title={title} className={styles}>
      {children}
    </Element>
  );
};
