'use client';

interface Props {
  reset: () => void;
}

const Error = ({ reset }: Props) => {
  return (
    <div>
      <h2>Something went wrong.</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
