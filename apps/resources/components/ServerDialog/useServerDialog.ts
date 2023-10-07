import { ContentType } from 'lib/resources';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface AddToCollectionParams {
  resourceId: number;
  resourceType: ContentType;
}

interface UpdateCollectionParams {
  collectionId: number;
}

export const useServerDialog = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const nextSearchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Overloads
  function openDialog(
    dialog: 'add-to-collection',
    params: AddToCollectionParams,
  ): void;
  function openDialog(
    dialog: 'update-collection',
    params: UpdateCollectionParams,
  ): void;
  function openDialog(dialog: 'add-collection'): void;

  // Implementation
  function openDialog(dialog: string, params?: unknown) {
    const searchParams = new URLSearchParams(nextSearchParams.toString());
    searchParams.set('dialog', dialog);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        searchParams.set(key, String(value));
      }
    }

    const searchPath = searchParams.toString() ? `?${searchParams}` : '';

    startTransition(() => {
      push(`${pathname}${searchPath}`, { scroll: false });
    });
  }

  return {
    openDialog,
    isPending,
  };
};
