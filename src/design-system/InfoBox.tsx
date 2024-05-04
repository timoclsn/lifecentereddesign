import { VariantProps, cva } from 'cva';
import { ReactNode } from 'react';

const styles = cva({
  base: 'px-6 py-4 flex gap-2 [&_svg]:size-[20px]',
  variants: {
    variant: {
      success: 'bg-green-600 text-white',
      error: 'bg-destructive text-destructive-foreground',
      info: 'bg-orange-600 text-white',
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
