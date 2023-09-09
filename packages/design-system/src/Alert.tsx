'use client';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  cancleText?: string;
  actionText?: string;
  onAction?: () => void;
}

export const Alert = ({
  children,
  title,
  description,
  cancleText = 'Cancle',
  actionText = 'Ok',
  onAction,
}: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          {description && (
            <AlertDialog.Description>{description}</AlertDialog.Description>
          )}
          <AlertDialog.Cancel>{cancleText}</AlertDialog.Cancel>
          <AlertDialog.Action onClick={onAction}>
            {actionText}
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
