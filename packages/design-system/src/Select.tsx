'use client';

import { Label } from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import {
  ArrowDown,
  ArrowDownWideNarrow,
  ArrowUp,
  Check,
  ChevronDown,
  Loader,
  XCircle,
} from 'lucide-react';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useId,
} from 'react';

export const Select = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root {...props} />
);

Select.FilterTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label: string;
    isLoading?: boolean;
    isResettable?: boolean;
    onReset?: () => void;
  }
>(function SelectFilterTrigger(
  { className, disabled, label, isLoading, isResettable, onReset, ...props },
  ref
) {
  const id = useId();
  return (
    <div className="relative min-w-[0px] flex-1 sm:max-w-[240px]">
      <Label
        htmlFor={id}
        className="bg-bg-primary text-text-secondary absolute -top-1.5 left-5 px-1 text-xs leading-none"
      >
        {!disabled && label}
      </Label>
      <SelectPrimitive.Trigger
        id={id}
        disabled={disabled}
        className={cx(
          'border-ghost-main-dark-bg focus-visible:border-text-secondary flex w-full items-center justify-between rounded-full border-2 px-2 py-2 text-left text-lg font-bold leading-none outline-none disabled:opacity-50 sm:gap-1 sm:px-6 [&>span]:truncate [&>span]:whitespace-nowrap',
          className
        )}
        {...props}
        ref={ref}
      >
        {/* Value */}
        <SelectPrimitive.Value />

        {/* Icon */}
        <div className="flex items-center justify-center">
          {isLoading && (
            <Loader className="flex-none animate-spin opacity-60" />
          )}
          {!isLoading && (
            <SelectPrimitive.Icon
              className={`text-text-secondary flex-none${
                isResettable ? ' opacity-0' : ''
              }`}
            >
              <ArrowDown />
            </SelectPrimitive.Icon>
          )}
        </div>
      </SelectPrimitive.Trigger>

      {/* Reset Button */}
      {isResettable && !isLoading && (
        <button
          className="absolute right-0 top-0 mr-2 flex h-full items-center justify-center sm:mr-6"
          onClick={onReset}
        >
          <XCircle />
        </button>
      )}
    </div>
  );
});

Select.SortTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.SelectTrigger> & {
    isLoading?: boolean;
  }
>(function SelectSortTrigger({ className, isLoading, ...props }, ref) {
  const id = useId();
  return (
    <div className="flex items-center">
      <Label htmlFor={id}>
        <span className="sr-only">Sort by:</span>
      </Label>
      <SelectPrimitive.Trigger
        id={id}
        className={cx(
          'flex h-full items-center gap-1 outline-none focus-visible:underline disabled:opacity-50 [&>span]:truncate [&>span]:whitespace-nowrap',
          className
        )}
        {...props}
        ref={ref}
      >
        <ArrowDownWideNarrow className="text-text-secondary" />
        <SelectPrimitive.Value />
        {isLoading ? (
          <Loader size={20} className="flex-none animate-spin opacity-60" />
        ) : (
          <SelectPrimitive.Icon className="text-text-secondary flex-none">
            <ChevronDown />
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>
    </div>
  );
});

Select.Content = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent({ children, className, ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cx(
          'bg-primary-main-bg text-primary-contrast-text animate-in fade-in-75 zoom-in-90 z-20 rounded-2xl px-4 py-6 duration-100 ease-out',
          className
        )}
        {...props}
        ref={ref}
      >
        <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center">
          <ArrowUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="flex flex-col gap-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center">
          <ArrowDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});

Select.Item = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ children, className, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      className={cx(
        'hover:bg-primary-contrast-text hover:text-primary-main-bg focus-visible:bg-primary-contrast-text focus-visible:text-primary-main-bg cursor-pointer rounded-lg py-1 pl-[29px] pr-2 outline-none',
        className
      )}
      {...props}
      ref={ref}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-1 w-[25px]">
        <Check />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
