'use client';

import { Label } from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cx } from 'cva';
import {
  ArrowDown,
  ArrowDownWideNarrow,
  ArrowUp,
  Check,
  ChevronDown,
  Loader2,
  XCircle,
} from 'lucide-react';
import { ComponentProps, useId } from 'react';

export const Select = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root {...props} />
);

Select.FilterTrigger = function SelectFilterTrigger({
  className,
  disabled,
  label,
  isLoading,
  isResettable,
  onReset,
  ref,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  label: string;
  isLoading?: boolean;
  isResettable?: boolean;
  onReset?: () => void;
}) {
  const id = useId();
  return (
    <div className="relative min-w-[0px] flex-1 sm:max-w-[240px]">
      <Label
        htmlFor={id}
        className="absolute -top-1.5 left-5 bg-bg-primary px-1 text-xs leading-none text-text-secondary"
      >
        {!disabled && label}
      </Label>
      <SelectPrimitive.Trigger
        id={id}
        disabled={disabled}
        className={cx(
          'flex w-full items-center justify-between rounded-full border-2 border-ghost-main-dark-bg px-2 py-2 text-left text-lg font-bold leading-none outline-hidden focus-visible:border-text-secondary disabled:opacity-50 sm:gap-1 sm:px-6 [&>span]:truncate [&>span]:whitespace-nowrap',
          className,
        )}
        {...props}
        ref={ref}
      >
        {/* Value */}
        <SelectPrimitive.Value />

        {/* Icon */}
        <div className="flex items-center justify-center">
          {isLoading && (
            <Loader2 className="flex-none animate-spin opacity-60" />
          )}
          {!isLoading && (
            <SelectPrimitive.Icon
              className={`flex-none text-text-secondary ${
                isResettable ? 'opacity-0' : ''
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
          className="ease active:scale-9 absolute right-0 top-0 mr-2 flex h-full items-center justify-center text-text-secondary transition-transform hover:scale-110 sm:mr-6"
          onClick={onReset}
        >
          <XCircle />
          <span className="sr-only">Reset filter</span>
        </button>
      )}
    </div>
  );
};

Select.SortTrigger = function SelectSortTrigger({
  className,
  isLoading,
  ref,
  ...props
}: ComponentProps<typeof SelectPrimitive.SelectTrigger> & {
  isLoading?: boolean;
}) {
  const id = useId();
  return (
    <div className="flex items-center">
      <Label htmlFor={id}>
        <span className="sr-only">Sort by:</span>
      </Label>
      <SelectPrimitive.Trigger
        id={id}
        className={cx(
          'flex h-full items-center gap-1 outline-hidden focus-visible:underline disabled:opacity-50 [&>span]:truncate [&>span]:whitespace-nowrap',
          className,
        )}
        {...props}
        ref={ref}
      >
        <ArrowDownWideNarrow className="text-text-secondary" />
        <SelectPrimitive.Value />
        {isLoading ? (
          <Loader2 size={20} className="flex-none animate-spin opacity-60" />
        ) : (
          <SelectPrimitive.Icon className="flex-none text-text-secondary">
            <ChevronDown />
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>
    </div>
  );
};

Select.Content = function SelectContent({
  children,
  className,
  ref,
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cx(
          'z-20 rounded-2xl bg-primary-main-bg px-4 py-6 text-primary-contrast-text duration-100 ease-out animate-in fade-in-75 zoom-in-90',
          className,
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
};

Select.Item = function SelectItem({
  children,
  className,
  ref,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cx(
        'cursor-pointer rounded-lg py-1 pl-[29px] pr-2 outline-hidden hover:bg-primary-contrast-text hover:text-primary-main-bg focus-visible:bg-primary-contrast-text focus-visible:text-primary-main-bg',
        className,
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
};
