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
  all: 'bg-black text-white',
  book: 'bg-oak text-dark',
  article: 'bg-forest text-dark',
  thoughtleader: 'bg-evening text-dark',
  category: 'bg-forest text-dark',
  topic: 'bg-grass text-dark',
  podcastEpisode: 'bg-sand text-dark',
  podcast: 'bg-sky text-dark',
  directory: 'bg-oak text-dark',
  video: 'bg-grass text-dark',
  tool: 'bg-stone text-dark',
  communityOrOrganization: 'bg-morning text-dark',
  course: 'bg-evening text-dark',
} as const;

export const FilterButton = ({
  children,
  size = 'l',
  variant = 'all',
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
