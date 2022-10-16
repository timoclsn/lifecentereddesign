import { cx } from 'class-variance-authority';
import { ReactNode } from 'react';

const validElements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'ul',
  'ol',
  'span',
  'strong',
  'small',
  'label',
] as const;

const sizes = {
  medium: 'text-base',
  large: 'text-2xl',
} as const;

const weights = {
  normal: 'font-normal',
  bold: 'font-bold',
} as const;

interface Props {
  children: ReactNode;
  as?: typeof validElements[number];
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  className?: string;
}

export const Text = ({
  children,
  as: Element = 'span',
  size = 'medium',
  weight = 'normal',
  className,
}: Props) => {
  const styles = cx(['font-sans', sizes[size], weights[weight], className]);
  return <Element className={styles}>{children}</Element>;
};
