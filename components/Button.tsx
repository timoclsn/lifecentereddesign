import { ReactNode } from 'react';

const variants = {
  black: 'bg-black text-white',
  white: 'bg-white text-black',
  oak: 'bg-oak text-black',
  grass: 'bg-grass text-black',
  sky: 'bg-sky text-black',
  evening: 'bg-evening text-black',
  sand: 'bg-sand text-black',
  morning: 'bg-morning text-black',
  forest: 'bg-forest text-black',
  stone: 'bg-stone text-black',
} as const;

const sizes = {
  s: 'px-6 py-2',
  l: 'px-8 py-4',
} as const;

interface Props {
  children: ReactNode;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  target?: '_blank';
}

export function Button({
  children,
  variant = 'black',
  size = 's',
  type = 'button',
  onClick,
  disabled,
  href,
  target,
}: Props) {
  const Tag = href ? 'a' : 'button';
  const className = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'rounded-full',
    'font-bold',
    'disabled:opacity-50',
    'hover:opacity-80',
    '[&>svg]:w-[20px]',
    '[&>svg]:h-[20px]',
    variants[variant],
    sizes[size],
  ].join(' ');

  return (
    <Tag
      className={className}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Tag>
  );
}
