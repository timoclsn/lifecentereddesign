import React from 'react';
import type { ElementType, ReactNode } from 'react';

import { Box } from '../Box';
import type { BoxProps } from '../Box';

interface Props {
  children: ReactNode;
  as?: ElementType;
  color?: BoxProps['background'];
  fullWidth?: boolean;
  className?: string;
}

export function Card({
  children,
  as = 'div',
  color = 'oak-normal',
  fullWidth,
  ...props
}: Props) {
  return (
    <Box
      as={as}
      borderRadius="24px"
      paddingX="24px"
      paddingY="48px"
      color="black-normal"
      background={color}
      width={fullWidth ? 'full' : undefined}
      {...props}
    >
      {children}
    </Box>
  );
}
