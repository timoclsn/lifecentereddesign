import { ReactNode } from 'react';

const variants = {
  light: 'bg-tag-light rounded-full',
  dark: 'bg-tag-dark rounded-lg',
} as const;

interface Props {
  children: ReactNode;
  variant?: keyof typeof variants;
}

export const Tag = ({ children, variant = 'light' }: Props) => {
  return (
    <div
      className={`inline-block px-3 py-1 text-sm font-bold ${variants[variant]}`}
    >
      {children}
    </div>
  );
};
