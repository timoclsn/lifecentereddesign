import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  interval?: number;
}

export const RefreshOnPolling = ({ interval = 5000 }: Props) => {
  const { refresh } = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval, refresh]);

  return null;
};
