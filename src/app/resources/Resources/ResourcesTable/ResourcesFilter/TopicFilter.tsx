'use client';

import { Select } from '@/design-system';
import { useFilter } from '../../../../../hooks/useFilter';
import { Topics } from '@/data/resources/query';

interface Props {
  topics: Topics;
}

export const TopicFilter = ({ topics }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();
  const value = searchParams.get('topic') || 'all';

  return (
    <Select
      defaultValue="all"
      value={value}
      onValueChange={(value) => {
        handleValueChange('topic', value);
      }}
    >
      <Select.FilterTrigger
        label="Topic"
        isLoading={isPending}
        isResettable={value !== 'all'}
        onReset={() => {
          handleValueChange('topic', 'all');
        }}
      />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {topics.map((topic) => (
          <Select.Item key={topic.id} value={String(topic.id)}>
            {topic.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
