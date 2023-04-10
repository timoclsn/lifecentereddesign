import { cva, VariantProps } from 'class-variance-authority';
import { ElementType, ReactNode } from 'react';

const styles = cva(
  'inline-flex items-center justify-center gap-2 leading-none whitespace-nowrap disabled:opacity-50',
  {
    variants: {
      variant: {
        contained: null,
        outline: null,
        text: null,
      },
      size: {
        small:
          'text-base leading-6 [&>svg]:w-[16px] [&>svg]:h-[16px] px-4 py-2',
        medium:
          'text-base leading-6 [&>svg]:w-[20px] [&>svg]:h-[20px] px-6 py-4',
        large: 'text-2xlleading-8[&>svg]:w-[25px][&>svg]:h-[25px] px-6 py-4',
      },
      color: {
        primary: null,
      },
      selected: {
        true: 'text-primary-hover-text bg-primary-ghost-bg',
      },
    },
    compoundVariants: [
      {
        variant: 'contained',
        color: 'primary',
        class:
          'text-primary-contrast-text bg-primary-main-bg hover:bg-primary-hover-bg disabled:bg-primary-disabled-bg',
      },
      {
        variant: 'outline',
        color: 'primary',
        class:
          'text-primary-main-text ring-2 ring-primary-main-bg ring-inset hover:opacity-70',
      },
      {
        variant: 'text',
        color: 'primary',
        class:
          'text-primary-main-text hover:text-primary-hover-text hover:bg-primary-ghost-bg disabled:text-primary-disabled-text disabled:bg-transparent',
      },
    ],
  }
);

export interface ButtonProps extends VariantProps<typeof styles> {
  children: ReactNode;
  as?: ElementType;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  external?: boolean;
  className?: string;
}

export function Button({
  children,
  as,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled,
  href,
  external,
  selected,
  className,
}: ButtonProps) {
  const Element = as ? as : href ? 'a' : 'button';
  return (
    <Element
      className={styles({ variant, size, color, selected, className })}
      type={Element === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Element>
  );
}
