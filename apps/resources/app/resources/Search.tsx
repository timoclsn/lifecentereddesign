'use client';

import { Search as SearchIcon, Loader } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { useFilter } from './useFilter';

export const Search = () => {
  const { handleValueChange, isPending } = useFilter();
  const handleSearch = useDebouncedCallback((value) => {
    handleValueChange('search', value);
  }, 500);

  return (
    <div className="bg-primary-ghost-bg text-text-secondary focus-within:ring-text-secondary flex min-w-[100px] flex-1 items-center gap-2 px-4 py-1 outline-none ring-inset focus-within:ring-2 sm:max-w-[240px]">
      <SearchIcon className="flex-none opacity-60" size="16" />
      <input
        placeholder="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="text-text-primary w-full bg-transparent outline-none"
      />
      <Loader
        className={`flex-none animate-spin ${
          isPending ? 'opacity-60' : 'opacity-0'
        }`}
        size="16"
      />
    </div>
  );
};
