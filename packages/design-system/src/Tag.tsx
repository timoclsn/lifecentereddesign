import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const tag = cva(
  [
    'px-4 py-2',
    'font-bold',
    'text-ghost-contrast-text',
    'rounded-full',
    'flex justify-center items-center gap-2',
    '[&>svg]:w-[16px]',
    '[&>svg]:h-[16px]',
  ],
  {
    variants: {
      variant: {
        light: ['bg-ghost-main-light-bg'],
        dark: ['bg-ghost-main-dark-bg'],
        outline: ['border-2 border-ghost-main-dark-bg'],
      },
    },
  }
);

type TagProps = VariantProps<typeof tag>;

interface ComponentProps {
  children: ReactNode;
}

type Props = ComponentProps & TagProps;

export const Tag = ({ children, variant = 'light' }: Props) => {
  return <div className={tag({ variant })}>{children}</div>;
};
