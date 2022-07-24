import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  variant?: keyof typeof variants;
  selected?: boolean;
  onClick: () => void;
}

const variants = {
  black: 'bg-black text-white',
  oak: 'bg-oak text-dark',
  forest: 'bg-forest text-dark',
  evening: 'bg-evening text-dark',
  grass: 'bg-grass text-dark',
  sand: 'bg-sand text-dark',
  sky: 'bg-sky text-dark',
  stone: 'bg-stone text-dark',
  morning: 'bg-morning text-dark',
} as const;

export const FilterButton = ({
  children,
  variant = 'black',
  selected,
  onClick,
}: Props) => {
  return (
    <button
      className={`flex-none rounded-2xl py-3 px-5 text-sm font-bold ${
        selected ? variants[variant] : 'hover:opacity-80'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
