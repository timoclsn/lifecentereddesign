import * as React from 'react';

import { cn } from '@/lib/utils/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefObject<HTMLInputElement>;
}

const Input = ({ className, type, ref, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
};
interface InputErrorProps {
  children: React.ReactNode;
}

const InputError = ({ children }: InputErrorProps) => {
  return (
    <p className="text-sm text-red-700 duration-100 ease-in-out animate-in fade-in slide-in-from-top-full">
      {children}
    </p>
  );
};

export { Input, InputError };
