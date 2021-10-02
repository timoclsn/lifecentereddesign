import React from 'react';
import type { ReactNode } from 'react';

import type { BoxProps } from '../Box';
import { Box } from '../Box';

interface Props {
  children: ReactNode;
  as?: 'div' | 'main' | 'aside' | 'header' | 'footer' | 'section' | 'nav';
  width?: BoxProps['maxWidth'];
  inset?: BoxProps['paddingX'];
  className?: string;
}

export function Container({
  children,
  as = 'div',
  width = '1280px',
  inset,
  ...props
}: Props) {
  return (
    <Box
      as={as}
      width="full"
      maxWidth={width}
      paddingX={inset}
      marginX="auto"
      {...props}
    >
      {children}
    </Box>
  );
}
