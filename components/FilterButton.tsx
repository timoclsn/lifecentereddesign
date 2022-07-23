import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  onClick: () => void;
}

const sizes = {
  s: 'px-6 py-4',
  l: 'px-8 py-6 text-xl',
} as const;

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
  size = 'l',
  variant = 'black',
  onClick,
}: Props) => {
  return (
    <button
      className={`flex-none rounded-2xl font-bold ${sizes[size]} ${variants[variant]} hover:opacity-80`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
