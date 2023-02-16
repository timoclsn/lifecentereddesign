import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const styles = cva('rounded-4xl p-8 pt-10 w-full', {
  variants: {
    variant: {
      oak: 'bg-oak',
      forest: 'bg-forest',
      evening: 'bg-evening',
      lime: 'bg-lime',
      sand: 'bg-sand',
      sky: 'bg-sky',
      stone: 'bg-stone',
      morning: 'bg-morning',
      primary: 'bg-primary-main-bg',
    },
  },
});

export interface CardProps extends VariantProps<typeof styles> {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, variant = 'sand', className }: CardProps) => {
  return <div className={styles({ variant, className })}>{children}</div>;
};
