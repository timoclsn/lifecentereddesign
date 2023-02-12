import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const infoBoxVariants = cva(
  'px-6 py-4 text-white flex gap-2 [&_svg]:h-[20px] [&_svg]:w-[20px]',
  {
    variants: {
      variant: {
        success: 'bg-green-700',
        error: 'bg-red-700',
      },
    },
  }
);

interface Props extends VariantProps<typeof infoBoxVariants> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const InfoBox = ({ children, icon, className, variant }: Props) => {
  return (
    <div className={infoBoxVariants({ variant, className })}>
      {icon && (
        <div className="flex-none flex justify-center mt-0.5">{icon}</div>
      )}
      {children}
    </div>
  );
};
