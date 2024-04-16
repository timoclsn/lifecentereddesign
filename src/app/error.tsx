'use client';

import { Button, Heading } from '@/components/design-system';

interface Props {
  reset: () => void;
}

const Error = ({ reset }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Heading level="2">Something went wrong :(</Heading>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
};

export default Error;
