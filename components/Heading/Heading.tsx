import React from 'react';
import type { ReactNode } from 'react';

import { Text } from '../Text';
import type { TextProps } from '../Text';

interface Props {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: TextProps['color'];
  size?: TextProps['size'];
  lineHeight?: TextProps['lineHeight'];
  weight?: TextProps['weight'];
  decoration?: TextProps['decoration'];
  className?: string;
}

export function Heading({
  children,
  as: Element = 'h1',
  color = 'black-normal',
  size = '5xl',
  lineHeight,
  weight = 'bold',
  decoration,
  ...props
}: Props) {
  return (
    <Text
      as={Element}
      color={color}
      size={size}
      lineHeight={lineHeight}
      weight={weight}
      decoration={decoration}
      {...props}
    >
      {children}
    </Text>
  );
}
