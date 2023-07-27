import {
  Categories,
  LikedResources,
  Topics,
} from '../../../../../lib/resources';
import { CategoryFilter } from './CategoryFilter';
import { Clear } from './Clear';
import { LikeFilter } from './LikeFilter';
import { Search } from './Search';
import { Sort } from './Sort';
import { TopicFilter } from './TopicFilter';
import { TypeFilter } from './TypeFilter';

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
  return (
    <div className="bg-bg-primary sticky top-0 z-10 flex flex-wrap justify-between gap-3 py-4 sm:py-6">
      <div className="flex flex-1 gap-3 sm:w-auto sm:flex-nowrap">
        <TypeFilter />
        <CategoryFilter categories={categories} />
        <TopicFilter topics={topics} />
      </div>

      <div className="flex flex-wrap gap-3">
        {likedResources.length > 0 && (
          <LikeFilter likedResources={likedResources} />
        )}
        <Search />
        <Sort />
        <Clear />
      </div>
    </div>
  );
};
