'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface Props {
  children: number;
  initalCount?: number;
  onCountUpFinished?: () => void;
  className?: string;
}

export const CountUp = ({
  children,
  initalCount = 0,
  onCountUpFinished,
  className,
}: Props) => {
  const count = useCountUp({
    initalCount,
    finalCount: children,
    onCountUpFinished,
  });
  return <span className={className}>{count}</span>;
};
