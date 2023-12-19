import { Categories } from 'data/categories/query';
import { CommentedResources, LikedResources } from 'data/resources/query';
import { Topics } from 'data/topics/query';
import { CategoryFilter } from './CategoryFilter';
import { Clear } from './Clear';
import { CommentsFilter } from './CommentsFilter';
import { LikesFilter } from './LikesFilter';
import { Search } from './Search';
import { Sort } from './Sort';
import { TopicFilter } from './TopicFilter';
import { TypeFilter } from './TypeFilter';

interface Props {
  categories: Categories;
  topics: Topics;
  likedResources: LikedResources;
  commentedResources: CommentedResources;
}

export const ResourcesFilter = ({
  categories,
  topics,
  likedResources,
  commentedResources,
}: Props) => {
  return (
    <div className="bg-bg-primary sticky top-0 z-10 flex flex-wrap justify-between gap-3 py-4 sm:py-6">
      <div className="flex flex-1 gap-3 sm:w-auto sm:flex-nowrap">
        <TypeFilter />
        <CategoryFilter categories={categories} />
        <TopicFilter topics={topics} />
      </div>

      <div className="flex flex-wrap gap-3">
        {commentedResources.length > 0 && (
          <CommentsFilter commentedResources={commentedResources} />
        )}
        {likedResources.length > 0 && (
          <LikesFilter likedResources={likedResources} />
        )}
        <Search />
        <Sort />
        <Clear />
      </div>
    </div>
  );
};
