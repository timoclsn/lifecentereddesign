'use client';

import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from 'design-system';
import { useRouter } from 'next/navigation';

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
        <DialogContent className="bg-stone fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll p-10">
          <DialogClose />
          {children}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
