'use client';

import { Select } from '@/components/design-system';
import { useFilter } from '../../../../../hooks/useFilter';

export const Sort = () => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const searchQuery = searchParams.get('search') || '';

  return (
    <Select
      defaultValue="date"
      value={searchParams.get('sort') || 'date'}
      onValueChange={(value) => {
        handleValueChange('sort', value);
      }}
    >
      <Select.SortTrigger disabled={searchQuery !== ''} isLoading={isPending} />
      <Select.Content>
        <Select.Item value="date">Date added</Select.Item>
        <Select.Item value="name">Name</Select.Item>
        <Select.Item value="likes">Likes</Select.Item>
        <Select.Item value="comments">Comments</Select.Item>
      </Select.Content>
    </Select>
  );
};
