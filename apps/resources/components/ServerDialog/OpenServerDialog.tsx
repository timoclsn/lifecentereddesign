'use client';

import { ContentType } from 'lib/resources';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useTransition } from 'react';

interface CommonProps {
  children: ReactNode;
  className?: string;
}

type ConditionalProps =
  | {
      dialog: 'add-to-collection';
      params: {
        resourceId: number;
        resourceType: ContentType;
      };
    }
  | {
      dialog: 'add-collection';
      params?: never;
    }
  | {
      dialog: 'update-collection';
      params: {
        collectionId: number;
      };
    };

type Props = CommonProps & ConditionalProps;

export const OpenServerDialog = ({
  children,
  className,
  dialog,
  params,
}: Props) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchParams = new URLSearchParams(nextSearchParams.toString());
  searchParams.set('dialog', dialog);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value));
    }
  }

  const searchPath = searchParams.toString() ? `?${searchParams}` : '';

  const handleClick = () => {
    startTransition(() => {
      push(`${pathname}${searchPath}`, { scroll: false });
    });
  };

  return (
    <button disabled={isPending} onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
