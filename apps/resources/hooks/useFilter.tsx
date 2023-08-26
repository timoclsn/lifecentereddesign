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
    const searchParamsString = searchParams.toString();
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
      splitbee.track('Filter resources by type', {
        type: value,
      });
    }

    if (param === 'category') {
      splitbee.track('Filter resources by category', {
        category: value,
      });
    }

    if (param === 'topic') {
      splitbee.track('Filter resources by topic', {
        topic: value,
      });
    }

    if (param === 'sort') {
      splitbee.track('Sort resources', {
        by: value,
      });
    }

    if (param === 'likes') {
      splitbee.track('Toggle filter resources by likes');
    }

    if (param === 'comments') {
      splitbee.track('Toggle filter resources by comments');
    }

    if (param === 'limit') {
      splitbee.track('Show more resources', {
        count: parseInt(value),
      });
    }
  };

  const clearAll = () => {
    startTransition(() => {
      replace(pathname, { scroll: false });
    });
    scrollToTop();
    console.log('clearAll');
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
