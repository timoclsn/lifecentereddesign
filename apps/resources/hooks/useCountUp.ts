import { useEffect, useState } from 'react';

interface Arguments {
  initalCount: number;
  finalCount: number;
  speed?: number;
}

export const useCountUp = ({
  initalCount,
  finalCount,
  speed = 15,
}: Arguments) => {
  const [count, setCount] = useState(initalCount);
  const maxLength = finalCount.toString().length;

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
  }, [finalCount, speed]);

  return count.toString().padStart(maxLength, '0');
};
