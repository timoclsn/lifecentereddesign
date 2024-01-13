import { VariantProps, cva } from 'cva';
import { ElementType, ReactNode, forwardRef } from 'react';

const styles = cva({
  base: 'inline-flex items-center justify-center gap-2 leading-none whitespace-nowrap focus-visible:outline-2 outline-offset-2',
  variants: {
    variant: {
      contained: null,
      outline: null,
      text: null,
    },
    size: {
      small: 'text-base leading-6 [&>svg]:size-[16px] px-4 py-2',
      medium: 'text-base leading-6 [&>svg]:size-[16px] px-6 py-4',
      large: 'text-xl leading-8 [&>svg]:size-[20px] px-6 py-4',
    },
    color: {
      primary: null,
      danger: null,
    },
  },
  compoundVariants: [
    {
      variant: 'contained',
      color: 'primary',
      class:
        'text-primary-contrast-text bg-primary-main-bg hover:bg-primary-hover-bg disabled:bg-primary-disabled-bg outline-primary-main-bg',
    },
    {
      variant: 'outline',
      color: 'primary',
      class:
        'text-primary-main-text ring-2 ring-primary-main-bg ring-inset hover:opacity-70 outline-primary-main-bg',
    },
    {
      variant: 'text',
      color: 'primary',
      class:
        'text-primary-main-text hover:text-primary-hover-text hover:bg-primary-ghost-bg disabled:text-primary-disabled-text disabled:bg-transparent outline-primary-main-bg',
    },
    {
      variant: 'contained',
      color: 'danger',
      class:
        'text-primary-contrast-text bg-red-700 hover:bg-red-600 disabled:opacity-50 outline-red-700',
    },
    {
      variant: 'outline',
      color: 'danger',
      class:
        'text-primary-main-text ring-2 ring-red-700 ring-inset hover:opacity-70 outline-red-700',
    },
    {
      variant: 'text',
      color: 'danger',
      class:
        'text-red-700 hover:text-red-600 disabled:opacity-50 outline-red-700',
    },
  ],
});

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

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
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
      className,
    },
    ref,
  ) => {
    const Element = as ? as : href ? 'a' : 'button';
    return (
      <Element
        ref={ref}
        className={styles({ variant, size, color, className })}
        type={Element === 'button' ? type : undefined}
        onClick={onClick}
        disabled={disabled}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener' : undefined}
      >
        {children}
      </Element>
    );
  },
);

Button.displayName = 'Button';
