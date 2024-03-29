'use client';

import { ContentType } from 'lib/resources';
import { Select } from 'design-system';
import { useFilter } from '../../../../../hooks/useFilter';

type TypeFilter = ContentType | 'all';

type TypeFilterList = Array<{
  text: string;
  type: TypeFilter;
}>;

const typeFilterList = (
  [
    {
      text: 'All',
      type: 'all',
    },
    {
      text: 'Thoughtleaders',
      type: 'thoughtleader',
    },
    {
      text: 'Books',
      type: 'book',
    },
    {
      text: 'Articles',
      type: 'article',
    },
    {
      text: 'Courses',
      type: 'course',
    },
    {
      text: 'Podcasts',
      type: 'podcast',
    },
    {
      text: 'Podcast Episodes',
      type: 'podcastEpisode',
    },
    {
      text: 'Videos',
      type: 'video',
    },
    {
      text: 'Tools',
      type: 'tool',
    },
    {
      text: 'Directories',
      type: 'directory',
    },
    {
      text: 'Communities',
      type: 'community',
    },
    {
      text: 'Examples',
      type: 'example',
    },
    {
      text: 'Agencies',
      type: 'agency',
    },
    {
      text: 'Slides',
      type: 'slide',
    },
    {
      text: 'Magazines',
      type: 'magazine',
    },
    {
      text: 'Newsletters',
      type: 'newsletter',
    },
    {
      text: 'Papers',
      type: 'paper',
    },
    {
      text: 'Social Media Profiles',
      type: 'socialMediaProfile',
    },
    {
      text: 'Reports',
      type: 'report',
    },
  ] as TypeFilterList
).sort((a, b) => {
  if (a.text === 'All') return -1;
  if (b.text === 'All') return 1;
  return a.text.localeCompare(b.text);
});

export const TypeFilter = () => {
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
        {typeFilterList.map((type, idx) => (
          <Select.Item key={idx} value={type.type}>
            {type.text}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};
