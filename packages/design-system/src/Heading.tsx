import { VariantProps, cva } from 'cva';
import { ReactNode } from 'react';

const validElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'span', 'p'] as const;
type ValidElements = (typeof validElements)[number];

const styles = cva({
  base: 'font-serif font-bold',
  variants: {
    level: {
      '1': 'text-3xl sm:text-7xl',
      '2': 'text-4xl',
      '3': 'text-xl sm:text-3xl',
      '4': 'text-2xl',
      '5': 'text-xl',
    },
  },
});

interface Props extends VariantProps<typeof styles> {
  children: ReactNode;
  as?: ValidElements;
  title?: string;
  className?: string;
}

export const Heading = ({
  children,
  as,
  level = '2',
  title,
  className,
}: Props) => {
  const Element = as ? as : (`h${level}` as ValidElements);
  return (
    <Element title={title} className={styles({ level, className })}>
      {children}
    </Element>
  );
};
