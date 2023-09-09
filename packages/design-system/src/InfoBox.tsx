import { cva, VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

const styles = cva(
  'px-6 py-4 text-white flex gap-2 [&_svg]:h-[20px] [&_svg]:w-[20px]',
  {
    variants: {
      variant: {
        success: 'bg-green-700',
        error: 'bg-red-700',
      },
    },
  },
);

interface Props extends VariantProps<typeof styles> {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const InfoBox = ({ children, icon, className, variant }: Props) => {
  return (
    <div className={styles({ variant, className })}>
      {icon && (
        <div className="mt-0.5 flex flex-none justify-center">{icon}</div>
      )}
      {children}
    </div>
  );
};
