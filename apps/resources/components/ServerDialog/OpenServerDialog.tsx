'use client';

import { ContentType } from 'lib/resources';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

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
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();

  const searchParams = new URLSearchParams(nextSearchParams.toString());
  searchParams.set('dialog', dialog);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      searchParams.set(key, String(value));
    }
  }

  const searchPath = searchParams.toString() ? `?${searchParams}` : '';
  return (
    <Link
      href={`${pathname}${searchPath}`}
      className={className}
      scroll={false}
    >
      {children}
    </Link>
  );
};
