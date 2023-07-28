'use client';

import { Select } from 'design-system';
import { useFilter } from '../../../../../hooks/useFilter';
import { Categories } from '../../../../../lib/resources';

interface Props {
  categories: Categories;
}

export const CategoryFilter = ({ categories }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();

  return (
    <Select
      defaultValue="all"
      value={searchParams.get('category') || 'all'}
      onValueChange={(value) => {
        handleValueChange('category', value);
      }}
    >
      <Select.FilterTrigger label="Category" isLoading={isPending} />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {categories.map((category) => (
          <Select.Item key={category.id} value={category.name}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
