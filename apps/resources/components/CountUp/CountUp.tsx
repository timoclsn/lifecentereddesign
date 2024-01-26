'use client';

import { cx } from 'cva';
import { useCountUp } from 'hooks/useCountUp';

interface Props {
  initalCount?: number;
  children: number;
  className?: string;
}

export const CountUp = ({ children, initalCount = 0, className }: Props) => {
  const count = useCountUp({
    initalCount,
    finalCount: children,
  });
  return (
    <span className={cx('font-mono slashed-zero tabular-nums', className)}>
      {count}
    </span>
  );
};
