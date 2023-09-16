'use client';

import { Dialog } from 'design-system';
import { useRouter } from 'next/navigation';
import { ComponentPropsWithoutRef, useState } from 'react';

export const ServerDialog = ({
  ...props
}: ComponentPropsWithoutRef<typeof Dialog>) => {
  const [open, setOpen] = useState(true);
  const { back } = useRouter();
  const onOpenChange = (open: boolean) => {
    if (!open) {
      back();
    }
    setOpen(open);
  };
  return <Dialog open={open} onOpenChange={onOpenChange} {...props} />;
};
