import { ResourceCard } from '@/components/ResourceCard/ResourceCard';
import { Resources } from '@/data/resources/query';
import { Heading } from '@/design-system';
import { AutoAnimate } from '../../../../../components/AutoAnimate/AutoAnimate';
import { ClearAllButton } from './ClearAllButton';
import { DownloadButton } from './DownloadButton/DownloadButton';
import { ResourcesListTop } from './ResourcesListTop';
import { ShowMoreButton } from './ShowMoreButton';

interface Props {
  resources: Resources;
  hasMore: boolean;
  isFiltered: boolean;
}

export const ResourcesList = ({ resources, hasMore, isFiltered }: Props) => {
  const showShowMoreBtn = hasMore;
  const showDownloadButton = isFiltered && resources.length > 0;

  return (
    <>
      <div className="flex flex-col gap-6">
        <ResourcesListTop />
        {resources.length > 0 ? (
          <AutoAnimate
            as="ul"
            className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-2"
          >
            {resources.map((resource) => {
              return (
                <li key={`${resource.type}-${resource.id}`}>
                  <ResourceCard resource={resource} />
                </li>
              );
            })}
          </AutoAnimate>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 py-16">
            <Heading level="3">No resources found…</Heading>
            <ClearAllButton />
          </div>
        )}
      </div>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:items-center">
        <ShowMoreButton moreToShow={showShowMoreBtn} />
        {showDownloadButton && <DownloadButton resources={resources} />}
      </div>
    </>
  );
};
