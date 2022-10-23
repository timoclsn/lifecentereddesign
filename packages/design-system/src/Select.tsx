import * as SelectPrimitive from '@radix-ui/react-select';
import clsx from 'clsx';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

export const Select = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root {...props} />
);

export const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const styles = clsx(
    'flex items-center gap-1 font-bold outline-none',
    className
  );
  return <SelectPrimitive.Trigger className={styles} {...props} ref={ref} />;
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
>(({ ...props }, ref) => <SelectPrimitive.Icon {...props} ref={ref} />);

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
  const styles = clsx(
    'rounded-2xl bg-primary-main-bg px-4 py-6 text-primary-contrast-text',
    className
  );
  return <SelectPrimitive.Content className={styles} {...props} ref={ref} />;
});

SelectContent.displayName = 'SelectContent';

export const SelectViewport = forwardRef<
  ElementRef<typeof SelectPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Viewport>
>(({ className, ...props }, ref) => {
  const styles = clsx('flex flex-col gap-1', className);
  return <SelectPrimitive.Viewport className={styles} {...props} ref={ref} />;
});

SelectViewport.displayName = 'SelectViewport';

export const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, ...props }, ref) => {
  const styles = clsx(
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
  const styles = clsx('absolute left-1 w-[25px]', className);
  return (
    <SelectPrimitive.ItemIndicator className={styles} {...props} ref={ref} />
  );
});

SelectItemIndicator.displayName = 'SelectItemIndicator';

export const SelectItemText = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemText>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>(({ ...props }, ref) => <SelectPrimitive.ItemText {...props} ref={ref} />);

SelectItemText.displayName = 'SelectItemText';
