import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useResourcesTable } from './ResourcesTableProvider';

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
    { scrollTop = true }: FilterOptions = { scrollTop: true }
  ) => {
    const searchParamsString = searchParams.toString();
    startTransition(() => {
      replace(
        `${pathname}${searchParamsString ? '?' : ''}${searchParamsString}`,
        {
          scroll: false,
        }
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
