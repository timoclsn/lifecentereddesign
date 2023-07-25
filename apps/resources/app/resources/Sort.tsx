'use client';

import { Select } from 'design-system';
import { useFilter } from './useFilter';

export const Sort = () => {
  const { searchParams, handleValueChange } = useFilter();
  const searchQuery = searchParams.get('search') || '';

  return (
    <Select
      defaultValue="date"
      value={searchParams.get('sort') || 'date'}
      onValueChange={(value) => {
        handleValueChange('sort', value);
      }}
    >
      <Select.SortTrigger disabled={searchQuery !== ''} />
      <Select.Content>
        <Select.Item value="date">Date added</Select.Item>
        <Select.Item value="title">Title</Select.Item>
        <Select.Item value="likes">Likes</Select.Item>
      </Select.Content>
    </Select>
  );
};
