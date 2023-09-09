'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';
import { Button } from './Button';
import { Heading } from './Heading';
import { Text } from './Text';

interface Props {
  children: ReactNode;
  title: string;
  description: string;
  cancleText?: string;
  actionText?: string;
  onAction?: () => void;
  destructive?: boolean;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export const Alert = ({
  children,
  title,
  description,
  cancleText = 'Cancle',
  actionText = 'Ok',
  onAction,
  destructive,
  open,
  onOpenChange,
}: Props) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-stone data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 opacity-60" />
        <AlertDialog.Content className="bg-bg-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] border-primary-main-bg fixed left-[50%] top-[50%] flex w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col gap-8 border-2 p-6 duration-200 sm:rounded-lg">
          <div className="flex flex-col space-y-2 text-center sm:text-left">
            <AlertDialog.Title asChild>
              <Heading as="h2" level="3">
                {title}
              </Heading>
            </AlertDialog.Title>
            <AlertDialog.Description asChild>
              <Text as="p">{description}</Text>
            </AlertDialog.Description>
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <AlertDialog.Cancel asChild>
              <Button variant="outline">{cancleText}</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={onAction} asChild>
              <Button
                variant="contained"
                color={destructive ? 'danger' : 'primary'}
              >
                {actionText}
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
