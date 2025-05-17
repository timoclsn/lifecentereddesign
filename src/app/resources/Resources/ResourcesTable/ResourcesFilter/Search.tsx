'use client';

import { Loader2, Search as SearchIcon } from 'lucide-react';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useFilter } from '../../../../../hooks/useFilter';

export const Search = () => {
  const { handleValueChange, isPending, searchParams } = useFilter();
  const searchQuery = searchParams.get('search');

  const handleChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      handleValueChange('search', event.target.value);
    },
    500,
  );

  return (
    <div className="bg-primary-ghost-bg text-text-secondary focus-within:ring-text-secondary flex min-w-[100px] flex-1 items-center gap-2 px-4 py-1 outline-hidden ring-inset focus-within:ring-2 sm:max-w-[240px]">
      <SearchIcon className="flex-none opacity-60" size="16" />
      <input
        key={searchQuery}
        placeholder="Search"
        defaultValue={searchQuery ?? ''}
        onChange={handleChange}
        autoComplete="off"
        className="text-text-primary w-full bg-transparent outline-hidden"
      />
      <Loader2
        className={`flex-none animate-spin ${
          isPending ? 'opacity-60' : 'opacity-0'
        }`}
        size="16"
      />
    </div>
  );
};
