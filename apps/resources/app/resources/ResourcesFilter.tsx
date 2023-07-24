'use client';

import { UilHeart, UilSearch, UilTimesCircle } from '@iconscout/react-unicons';
import * as Toggle from '@radix-ui/react-toggle';
import { SolidHeart } from '../../components/Icons/SolidHeart';
import { Select, Tooltip } from 'design-system';
import { Categories, ContentType, LikedResources, Topics } from 'lib/resources';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

interface Props {
  categories: Categories;
  topics: Topics;
  likedResources: LikedResources;
}

export const ResourcesFilter = ({
  categories,
  topics,
  likedResources,
}: Props) => {
  const nextSearchParams = useSearchParams();
  const searchParams = new URLSearchParams(nextSearchParams.toString());
  const likes = searchParams.get('likes');
  const searchQuery = searchParams.get('search');
  const filterByLikes = likes === 'true';
  const likedResourcesCount = likedResources.length;
  const isFiltered = searchParams.toString() !== '';

  const { replace } = useRouter();
  const pathname = usePathname();

  const filter = () => {
    const searchParamsString = searchParams.toString();
    replace(`${pathname}${searchParamsString ? '?' : ''}${searchParamsString}`);
  };

  const handleValueChange = (param: string, value: string) => {
    searchParams.set(param, value);
    filter();
  };

  const clearAll = () => {
    // @ts-expect-error
    for (const key of searchParams.keys()) {
      searchParams.delete(key);
    }
    filter();
  };
  return (
    <div className="bg-bg-primary sticky top-0 z-10 flex flex-wrap justify-between gap-3 py-4 sm:py-6">
      <div className="flex flex-1 gap-3 sm:w-auto sm:flex-nowrap">
        {/* Filter by type select */}
        <Select
          defaultValue="all"
          value={searchParams.get('type') || undefined}
          onValueChange={(value) => {
            handleValueChange('type', value);
          }}
        >
          <Select.FilterTrigger label="Type" />
          <Select.Content>
            {typeFilterList.map((type, idx) => (
              <Select.Item key={idx} value={type.type}>
                {type.text}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        {/* Filter by category select */}
        <Select
          defaultValue="all"
          value={searchParams.get('category') || undefined}
          onValueChange={(value) => {
            handleValueChange('category', value);
          }}
        >
          <Select.FilterTrigger label="Category" />
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

        {/* Filter by topic select */}
        <Select
          defaultValue="all"
          value={searchParams.get('topic') || undefined}
          onValueChange={(value) => {
            handleValueChange('topic', value);
          }}
        >
          <Select.FilterTrigger label="Topic" />
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
      </div>

      <div className="flex flex-wrap gap-3">
        {likedResources.length > 0 && (
          <div className="flex items-center justify-center gap-1">
            <Tooltip
              content={
                filterByLikes
                  ? 'Show all resources'
                  : `Only show ${likedResourcesCount} liked resources`
              }
              delayDuration={500}
            >
              <Toggle.Root
                aria-label="Filter by likes"
                className="ease text-text-primary flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
                onPressedChange={() => {
                  if (filterByLikes) {
                    searchParams.delete('likes');
                    filter();
                    return;
                  }
                  handleValueChange('likes', 'true');
                }}
              >
                {filterByLikes ? <SolidHeart /> : <UilHeart />}
              </Toggle.Root>
            </Tooltip>
            {likedResourcesCount}
          </div>
        )}

        {/* Search */}
        <div className="bg-primary-ghost-bg text-text-secondary focus-within:ring-text-secondary flex min-w-[100px] flex-1 items-center gap-2 px-4 py-1 outline-none ring-inset focus-within:ring-2 sm:max-w-[240px]">
          <UilSearch className="flex-none opacity-60" size="16" />
          <input
            placeholder="Search"
            value={searchParams.get('search') || undefined}
            onChange={(e) => {
              handleValueChange('search', e.target.value);
            }}
            className="text-text-primary w-full bg-transparent outline-none"
          />
        </div>

        {/* Sort select */}
        <Select
          defaultValue="date"
          value={searchParams.get('sort') || undefined}
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

        <Tooltip content="Clear all filter" delayDuration={500}>
          <button
            disabled={!isFiltered}
            onClick={clearAll}
            className="ease transition-transform hover:scale-110 active:scale-90 disabled:scale-100 disabled:opacity-50"
          >
            <UilTimesCircle />
            <span className="sr-only">Clear filters</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
