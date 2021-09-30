import React from 'react';
import type { ReactNode } from 'react';

import { Box } from '../Box';

interface Props {
  children: ReactNode;
  className?: string;
}

export function Label({ children, ...props }: Props) {
  return (
    <Box
      fontSize="md"
      paddingX="md"
      paddingY="sm"
      color="black-normal"
      background="soft"
      borderRadius="full"
      {...props}
    >
      {children}
    </Box>
  );
}
