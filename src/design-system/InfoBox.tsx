import { VariantProps, cva } from 'cva';
import { ReactNode } from 'react';

const styles = cva({
  base: 'px-6 py-4 text-white flex gap-2 [&_svg]:size-[20px]',
  variants: {
    variant: {
      success: 'bg-green-700',
      error: 'bg-red-700',
      info: 'bg-blue-700',
    },
  },
});

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
