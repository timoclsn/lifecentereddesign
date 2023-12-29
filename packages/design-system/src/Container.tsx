import { VariantProps, cva } from 'cva';
import { ReactNode } from 'react';

const containerVariants = cva({
  base: 'mx-auto max-w-screen-2xl w-full',
  variants: {
    inset: {
      true: 'px-6 sm:px-8',
    },
  },
});

interface Props extends VariantProps<typeof containerVariants> {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, inset, className }: Props) => {
  return (
    <div className={containerVariants({ inset, className })}>{children}</div>
  );
};
