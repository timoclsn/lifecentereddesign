'use client';

import { Select } from 'design-system';
import { useFilter } from '../../../../../hooks/useFilter';
import { Topics } from '../../../../../lib/resources';

interface Props {
  topics: Topics;
}

export const TopicFilter = ({ topics }: Props) => {
  const { searchParams, handleValueChange, isPending } = useFilter();

  return (
    <Select
      defaultValue="all"
      value={searchParams.get('topic') || 'all'}
      onValueChange={(value) => {
        handleValueChange('topic', value);
      }}
    >
      <Select.FilterTrigger label="Topic" isLoading={isPending} />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {topics.map((topic) => (
          <Select.Item key={topic.id} value={topic.name}>
            {topic.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
