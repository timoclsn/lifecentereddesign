import { track } from '@/lib/tracking';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useResourcesTable } from '../app/resources/Resources/ResourcesTable/ResourcesTableProvider';

interface FilterOptions {
  scrollTop?: boolean;
}

export const useFilter = () => {
  const nextSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams.toString());
  const { replace } = useRouter();
  const pathname = usePathname();
  const { scrollToTop } = useResourcesTable();
  const [isPending, startTransition] = useTransition();
  const isFiltered = searchParams.toString() !== '';

  const filter = (
    { scrollTop = true }: FilterOptions = { scrollTop: true },
  ) => {
    const searchParamsString = searchParams.toString().toLowerCase();
    startTransition(() => {
      replace(
        `${pathname}${searchParamsString ? '?' : ''}${searchParamsString}`,
        {
          scroll: false,
        },
      );
    });

    if (scrollTop) {
      scrollToTop();
    }
  };

  const handleValueChange = (param: string, value: string) => {
    if (value === '') {
      searchParams.delete(param);
      filter();
      return;
    }

    if (param !== 'search' && value === 'all') {
      searchParams.delete(param);
      filter();
      return;
    }

    searchParams.set(param, value);

    const isLimit = param === 'limit';

    filter({
      scrollTop: !isLimit,
    });

    // Tracking
    if (param === 'type') {
      track('Filter resources by type', {
        id: Number(value),
      });
    }

    if (param === 'category') {
      track('Filter resources by category', {
        id: Number(value),
      });
    }

    if (param === 'topic') {
      track('Filter resources by topic', {
        id: Number(value),
      });
    }

    if (param === 'sort') {
      track('Sort resources', {
        by: value,
      });
    }

    if (param === 'likes') {
      track('Toggle filter resources by likes');
    }

    if (param === 'comments') {
      track('Toggle filter resources by comments');
    }

    if (param === 'limit') {
      track('Show more resources', {
        count: parseInt(value),
      });
    }
  };

  const clearAll = () => {
    startTransition(() => {
      replace(pathname, { scroll: false });
    });
    scrollToTop();
  };

  return {
    searchParams,
    handleValueChange,
    clearAll,
    isPending,
    filter,
    isFiltered,
  };
};
