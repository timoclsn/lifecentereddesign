import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  url: string;
  external?: boolean;
  className?: string;
}

export const Link = ({ children, url, external, className }: Props) => {
  const styles = cx(['underline', className]);
  return (
    <a
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
    </a>
  );
};
