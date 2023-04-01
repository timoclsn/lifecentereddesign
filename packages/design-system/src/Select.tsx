import * as SelectPrimitive from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useId,
} from 'react';
import { Label } from '@radix-ui/react-label';

export const Select = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root {...props} />
);

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    label: string;
  }
>(({ className, disabled, label, ...props }, ref) => {
  const id = useId();
  return (
    <div className="relative min-w-[80px] flex-1 sm:max-w-[240px]">
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
          'border-ghost-main-dark-bg focus-visible:border-text-secondary flex w-full items-center justify-between rounded-full border-2 px-2 py-1 text-left text-lg font-bold leading-none outline-none disabled:opacity-50 sm:gap-1 sm:px-6 [&>span]:truncate [&>span]:whitespace-nowrap',
          className
        )}
        {...props}
        ref={ref}
      />
    </div>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = forwardRef<
  ElementRef<typeof SelectPrimitive.Value>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ ...props }, ref) => <SelectPrimitive.Value {...props} ref={ref} />);

SelectValue.displayName = 'SelectValue';

export const SelectIcon = forwardRef<
  ElementRef<typeof SelectPrimitive.Icon>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>
>(({ className, ...props }, ref) => {
  return (
    <SelectPrimitive.Icon
      className={cx('text-text-secondary flex-none', className)}
      {...props}
      ref={ref}
    />
  );
});

SelectIcon.displayName = 'SelectIcon';

export const SelectPortal = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Portal>) => (
  <SelectPrimitive.Portal {...props} />
);

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, ...props }, ref) => {
  const styles = cx(
    'rounded-2xl bg-primary-main-bg px-4 py-6 text-primary-contrast-text z-20 animate-in fade-in-75 zoom-in-90 duration-100 ease-out',
    className
  );
  return <SelectPrimitive.Content className={styles} {...props} ref={ref} />;
});

SelectContent.displayName = 'SelectContent';

export const SelectViewport = forwardRef<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  const styles = cx('flex flex-col gap-1', className);
  return <SelectPrimitive.Viewport className={styles} {...props} ref={ref} />;
});

SelectViewport.displayName = 'SelectViewport';

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, ...props }, ref) => {
  const styles = cx(
    'cursor-pointer rounded-lg py-1 pl-[29px] pr-2 outline-none hover:bg-primary-contrast-text hover:text-primary-main-bg',
    className
  );
  return <SelectPrimitive.Item className={styles} {...props} ref={ref} />;
});

SelectItem.displayName = 'SelectItem';

export const SelectItemIndicator = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>(({ className, ...props }, ref) => {
  const styles = cx('absolute left-1 w-[25px]', className);
  return (
    <SelectPrimitive.ItemIndicator className={styles} {...props} ref={ref} />
  );
});

SelectItemIndicator.displayName = 'SelectItemIndicator';

export const SelectItemText = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemText>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>(({ className, ...props }, ref) => {
  const styles = cx('whitespace-nowrap', className);
  return <SelectPrimitive.ItemText className={styles} {...props} ref={ref} />;
});

SelectItemText.displayName = 'SelectItemText';
