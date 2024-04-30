'use client';

import { Types } from '@/data/types/query';
import { Select } from '@/design-system';
import { useFilter } from '../../../../../hooks/useFilter';

interface Props {
  types: Types;
}

export const TypeFilter = ({ types }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const value = searchParams.get('type') || 'all';

  return (
    <Select
      defaultValue="all"
      value={value}
      onValueChange={(value) => {
        handleValueChange('type', value);
      }}
    >
      <Select.FilterTrigger
        label="Type"
        isLoading={isPending}
        isResettable={value !== 'all'}
        onReset={() => {
          handleValueChange('type', 'all');
        }}
      />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {types.map((type) => (
          <Select.Item key={type.name} value={type.name.toLowerCase()}>
            {type.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
