'use client';

import { Dialog } from 'design-system';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentPropsWithoutRef, useState, useTransition } from 'react';

export const ServerDialogRoot = ({
  ...props
}: ComponentPropsWithoutRef<typeof Dialog>) => {
  const [open, setOpen] = useState(true);
  const { replace } = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      // FIXME: Calling router.back() would be better here, the transition doesn't work with that
      const searchParams = new URLSearchParams(nextSearchParams.toString());
      searchParams.delete('dialog');
      const searchPath = searchParams.toString() ? `?${searchParams}` : '';

      startTransition(() => {
        replace(`${pathname}${searchPath}`, { scroll: false });
      });
    }
    setOpen(open);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={true}
      {...props}
    />
  );
};
