import { useEffect, useState } from 'react';

const DURATION = 3000; // 3s

interface Options {
  initalCount: number;
  finalCount: number;
  onCountUpFinished?: () => void;
}

export const useCountUp = ({
  initalCount,
  finalCount,
  onCountUpFinished,
}: Options) => {
  const [count, setCount] = useState(initalCount);
  const maxLength = finalCount.toString().length;
  const speed = DURATION / (finalCount - initalCount);

  useEffect(() => {
    if (count === finalCount) {
      onCountUpFinished?.();
    }
  }, [count, finalCount, onCountUpFinished]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < finalCount) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return finalCount;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [finalCount, onCountUpFinished, speed]);

  return count.toString().padStart(maxLength, '0');
};
