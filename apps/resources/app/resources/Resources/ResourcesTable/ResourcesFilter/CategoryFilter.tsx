'use client';

import { Select } from 'design-system';
import { useFilter } from '../../../../../hooks/useFilter';
import { Categories } from 'data/categories/query';

interface Props {
  categories: Categories;
}

export const CategoryFilter = ({ categories }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const value = searchParams.get('category') || 'all';

  return (
    <Select
      defaultValue="all"
      value={value}
      onValueChange={(value) => {
        handleValueChange('category', value);
      }}
    >
      <Select.FilterTrigger
        label="Category"
        isLoading={isPending}
        isResettable={value !== 'all'}
        onReset={() => {
          handleValueChange('category', 'all');
        }}
      />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {categories.map((category) => (
          <Select.Item key={category.id} value={String(category.id)}>
            {category.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
