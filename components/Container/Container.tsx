import React from 'react';
import type { ReactNode } from 'react';

import type { BoxProps } from '../Box';
import { Box } from '../Box';

interface Props {
  children: ReactNode;
  as?: 'div' | 'main' | 'aside' | 'header' | 'footer' | 'section';
  size?: BoxProps['maxWidth'];
  insetX?: BoxProps['paddingX'];
  insetY?: BoxProps['paddingY'];
  className?: string;
}

export function Container({
  children,
  as = 'div',
  size = 'xl',
  insetX,
  insetY,
  ...props
}: Props) {
  return (
    <Box
      as={as}
      maxWidth={size}
      paddingX={insetX}
      paddingY={insetY}
      marginX="auto"
      {...props}
    >
      {children}
    </Box>
  );
}
