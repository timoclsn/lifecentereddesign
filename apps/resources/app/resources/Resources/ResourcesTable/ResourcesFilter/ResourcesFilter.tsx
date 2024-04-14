import { Categories } from 'data/categories/query';
import { Topics } from 'data/topics/query';
import { Types } from 'data/types/query';
import { CategoryFilter } from './CategoryFilter';
import { Clear } from './Clear';
import { CommentsFilter } from './CommentsFilter';
import { LikesFilter } from './LikesFilter';
import { Search } from './Search';
import { Sort } from './Sort';
import { TopicFilter } from './TopicFilter';
import { TypeFilter } from './TypeFilter';

interface Props {
  types: Types;
  categories: Categories;
  topics: Topics;
  likedResourcesCount: number;
  commentedResourcesCount: number;
}

export const ResourcesFilter = ({
  types,
  categories,
  topics,
  likedResourcesCount,
  commentedResourcesCount,
}: Props) => {
  return (
    <div className="bg-bg-primary sticky top-0 z-10 flex flex-wrap justify-between gap-3 py-4 sm:py-6">
      <div className="flex flex-1 gap-3 sm:w-auto sm:flex-nowrap">
        <TypeFilter types={types} />
        <CategoryFilter categories={categories} />
        <TopicFilter topics={topics} />
      </div>

      <div className="flex flex-wrap gap-3">
        {commentedResourcesCount > 0 && (
          <CommentsFilter commentedResourcesCount={commentedResourcesCount} />
        )}
        {likedResourcesCount > 0 && (
          <LikesFilter likedResourcesCount={likedResourcesCount} />
        )}
        <Search />
        <Sort />
        <Clear />
      </div>
    </div>
  );
};
