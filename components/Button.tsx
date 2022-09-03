import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const button = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'leading-none',
    'px-6',
    'py-4',
    'whitespace-nowrap',
  ],
  {
    variants: {
      variant: {
        contained: [],
        text: [],
      },

      size: {
        medium: [
          'text-base',
          'leading-6',
          '[&>svg]:w-[20px]',
          '[&>svg]:h-[20px]',
        ],
        large: [
          'text-2xl',
          'leading-8',
          '[&>svg]:w-[25px]',
          '[&>svg]:h-[25px]',
        ],
      },

      color: {
        primary: [],
      },

      selected: {
        true: ['text-primary-hover-text bg-primary-ghost-bg'],
      },
    },

    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        class: [
          'text-primary-contrast-text bg-primary-main-bg',
          'hover:bg-primary-hover-bg',
          'disabled:bg-primary-disabled-bg',
        ],
      },
      {
        variant: 'text',
        color: 'primary',
        class: [
          'text-primary-main-text',
          'hover:text-primary-hover-text hover:bg-primary-ghost-bg',
          'disabled:text-primary-disabled-text disabled:bg-transparent',
        ],
      },
    ],
  }
);

export type ButtonProps = VariantProps<typeof button>;

interface ComponentProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  target?: '_blank';
}

type Props = ComponentProps & ButtonProps;

export function Button({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled,
  href,
  target,
  selected,
}: Props) {
  const Element = href ? 'a' : 'button';
  return (
    <Element
      className={button({ variant, size, color, selected })}
      type={Element === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Element>
  );
}
