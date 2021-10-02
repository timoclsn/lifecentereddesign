import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';

import { Box } from '../Box';
import { button } from './Button.css';
import type { ButtonVaraints } from './Button.css';

interface CommmonProps {
  children: ReactNode;
  className?: string;
}

type ConditionalProps =
  | {
      as?: 'button';
      type?: 'button' | 'submit' | 'reset';
      onClick?: () => void;
      disabled?: boolean;
      href?: never;
      target?: never;
      rel?: never;
    }
  | {
      as?: 'a';
      href?: string;
      target?: '_blank';
      rel?: 'noopener noreferrer' | 'noopener';
      type?: never;
      onClick?: never;
      disabled?: never;
    };

type Props = CommmonProps & ButtonVaraints & ConditionalProps;

export function Button({
  children,
  as = 'button',
  type = 'button',
  size = 'lg',
  variant = 'primary',
  fullWith,
  className,
  ...props
}: Props) {
  return (
    <Box
      as={as}
      type={as === 'button' ? type : undefined}
      className={clsx(button({ size, variant, fullWith }), className)}
      {...props}
    >
      {children}
    </Box>
  );
}