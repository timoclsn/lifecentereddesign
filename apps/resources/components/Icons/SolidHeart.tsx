interface Props {
  className?: string;
  size?: number;
}

export const SolidHeart = ({ className, size = 24 }: Props) => {
  return (
    <svg
      fill="currentColor"
      height={size}
      width={size}
      viewBox={`0 0 ${size} ${size}}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m21.1771 4.20139c-1.06-1.0628-2.4652-1.71146-3.9616-1.82883-1.4965-.11737-2.9856.30429-4.1984 1.18883-1.2723-.94637-2.856-1.37549-4.43206-1.20097-1.57607.17453-3.02748.93974-4.06195 2.14155-1.03446 1.20181-1.57515 2.75094-1.51317 4.33543.06198 1.5845.72202 3.0867 1.8472 4.204l6.20998 6.22c.52.5118 1.2204.7986 1.95.7986s1.43-.2868 1.95-.7986l6.21-6.22c1.1676-1.1747 1.8229-2.7637 1.8229-4.42001 0-1.65628-.6553-3.24527-1.8229-4.42z" />
    </svg>
  );
};
