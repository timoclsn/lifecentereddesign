import { VariantProps, cva } from 'cva';
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

const styles = cva({
  base: 'font-sans',
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-2xl',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
    },
  },
});

interface Props extends VariantProps<typeof styles> {
  children: ReactNode;
  as?: (typeof validElements)[number];
  className?: string;
}

export const Text = ({
  children,
  as: Element = 'span',
  size = 'medium',
  weight = 'normal',
  className,
}: Props) => {
  return (
    <Element className={styles({ size, weight, className })}>
      {children}
    </Element>
  );
};
