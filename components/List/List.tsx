import React from 'react';
import type { ReactNode } from 'react';

import { Box } from '../Box';
import { base } from './List.css';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  as?: 'ul' | 'ol';
  className?: string;
}

export function List({ children, as = 'ul', className, ...props }: Props) {
  return (
    <Box
      as={as}
      fontFamily="sans"
      fontSize="16px"
      color="dark"
      className={clsx(base, className)}
      {...props}
    >
      {children}
    </Box>
  );
}
