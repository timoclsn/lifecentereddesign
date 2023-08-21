'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from 'design-system';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const Modal = ({ children }: Props) => {
  const [open, setOpen] = useState(true);
  const { back } = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      back();
      return;
    }
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="h-[80%]">
          <DialogClose />
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
