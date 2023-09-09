import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const styles = cva(
  'px-4 py-2 font-bold text-ghost-contrast-text rounded-full flex justify-center items-center gap-2 [&>svg]:w-[16px] [&>svg]:h-[16px]',
  {
    variants: {
      variant: {
        light: 'bg-ghost-main-light-bg',
        dark: 'bg-ghost-main-dark-bg',
        outline: 'border-2 border-ghost-main-dark-bg',
      },
    },
  },
);

interface Props extends VariantProps<typeof styles> {
  children: ReactNode;
  className?: string;
}

export const Tag = ({ children, className, variant = 'light' }: Props) => {
  return <div className={styles({ variant, className })}>{children}</div>;
};
