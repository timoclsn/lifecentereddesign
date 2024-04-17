import { VariantProps, cva } from 'cva';
import { ReactNode } from 'react';
import { objectKeys } from './utils';

export type ColorVariant = keyof typeof colorVariants;

const colorVariants = {
  oak: 'bg-oak',
  forest: 'bg-forest',
  evening: 'bg-evening',
  lime: 'bg-lime',
  sand: 'bg-sand',
  sky: 'bg-sky',
  stone: 'bg-stone',
  morning: 'bg-morning',
} as const;

export const getRandomCardVariant = () => {
  const keys = objectKeys(colorVariants);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return randomKey;
};

const styles = cva({
  base: 'rounded-4xl p-8 pt-10 w-full',
  variants: {
    variant: {
      ...colorVariants,
      primary: 'bg-primary-main-bg',
      error: 'bg-red-700',
    },
  },
});

export interface CardProps extends VariantProps<typeof styles> {
  children?: ReactNode;
  className?: string;
}

export const Card = ({ children, variant = 'sand', className }: CardProps) => {
  return <div className={styles({ variant, className })}>{children}</div>;
};
