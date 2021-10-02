import React from 'react';
import type { ReactNode } from 'react';

import { mapResponsiveValue } from '../sprinkles.css';
import type { ResponsiveValue } from '../sprinkles.css';
import { Box } from '../Box';
import type { BoxProps } from '../Box';

const directionToFlexDirection = {
  vertical: 'column',
  horizontal: 'row',
} as const;

const alignToAlignItems = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
} as const;

const justifyToJustifyContent = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
} as const;

export interface StackProps {
  children: ReactNode;
  as?: 'div' | 'ul' | 'ol' | 'main';
  direction?: ResponsiveValue<keyof typeof directionToFlexDirection>;
  space?: BoxProps['gap'];
  align?: ResponsiveValue<keyof typeof alignToAlignItems>;
  justify?: ResponsiveValue<keyof typeof justifyToJustifyContent>;
  wrap?: boolean;
}

export function Stack({
  children,
  as = 'div',
  direction = 'vertical',
  space = '16px',
  align = 'start',
  justify = 'start',
  wrap = false,
}: StackProps) {
  return (
    <Box
      as={as}
      display="flex"
      flexDirection={mapResponsiveValue(
        direction,
        (value) => directionToFlexDirection[value]
      )}
      gap={space}
      alignItems={mapResponsiveValue(
        align,
        (value) => alignToAlignItems[value]
      )}
      justifyContent={mapResponsiveValue(
        justify,
        (value) => justifyToJustifyContent[value]
      )}
      flexWrap={wrap ? 'wrap' : undefined}
    >
      {children}
    </Box>
  );
}