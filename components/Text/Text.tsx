import React from 'react';
import type { ElementType, ReactNode } from 'react';

import { Box } from '../Box';
import type { BoxProps } from '../Box';

export interface TextProps {
  children: ReactNode;
  as?: ElementType;
  color?: BoxProps['color'];
  size?: BoxProps['fontSize'];
  weight?: BoxProps['fontWeight'];
  decoration?: BoxProps['textDecoration'];
  className?: string;
}

export function Text({
  children,
  as: Element = 'span',
  color = 'black-normal',
  size = '16px',
  weight = 'normal',
  decoration,
  ...props
}: TextProps) {
  return (
    <Box
      as={Element}
      fontFamily="sans"
      fontSize={size}
      fontWeight={weight}
      color={color}
      textDecoration={decoration}
      {...props}
    >
      {children}
    </Box>
  );
}
