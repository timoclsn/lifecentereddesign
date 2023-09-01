'use client';

import { Loader2, Search as SearchIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { useFilter } from '../../../../../hooks/useFilter';
import { ChangeEvent, useEffect, useState } from 'react';

export const Search = () => {
  const { handleValueChange, isPending, searchParams } = useFilter();
  const searchQuery = searchParams.get('search');
  const [searchInput, setSearchInput] = useState(searchQuery);
  const inputChanged = searchInput !== searchQuery;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = useDebouncedCallback((value) => {
    handleValueChange('search', value);
  }, 500);

  // Trigger search when search input changes
  useEffect(() => {
    if (!inputChanged) return;
    handleSearch(searchInput);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Set search input when search query changes
  useEffect(() => {
    if (!inputChanged) return;
    setSearchInput(searchQuery ?? '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="bg-primary-ghost-bg text-text-secondary focus-within:ring-text-secondary flex min-w-[100px] flex-1 items-center gap-2 px-4 py-1 outline-none ring-inset focus-within:ring-2 sm:max-w-[240px]">
      <SearchIcon className="flex-none opacity-60" size="16" />
      <input
        placeholder="Search"
        value={searchInput ?? ''}
        onChange={handleChange}
        className="text-text-primary w-full bg-transparent outline-none"
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
