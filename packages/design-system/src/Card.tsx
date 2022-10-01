import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

const variants = {
  oak: 'bg-oak',
  forest: 'bg-forest',
  evening: 'bg-evening',
  lime: 'bg-lime',
  sand: 'bg-sand',
  sky: 'bg-sky',
  stone: 'bg-stone',
  morning: 'bg-morning',
} as const;

export interface CardProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export const Card = ({ children, variant = 'sand', className }: CardProps) => {
  const styles = cx(['rounded-4xl p-8 pt-10', variants[variant], className]);
  return <div className={styles}>{children}</div>;
};
