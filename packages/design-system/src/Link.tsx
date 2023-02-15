import { cx } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

interface Props {
  as?: ElementType;
  children: ReactNode;
  url: string;
  external?: boolean;
  className?: string;
}

export const Link = ({
  as: Element = 'a',
  children,
  url,
  external,
  className,
}: Props) => {
  const styles = cx('underline hover:opacity-80', className);
  return (
    <Element
      href={url}
      {...(external
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {})}
      className={styles}
    >
      {children}
    </Element>
  );
};
