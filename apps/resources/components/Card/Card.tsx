import { Resource } from 'data/resources/query';
import { Card as CardPrimitive, Tag, Text, Tooltip } from 'design-system';
import { formateDate, getHostname } from 'lib/utils/utils';
import { CalendarDays, ExternalLink, StickyNote, Users2 } from 'lucide-react';
import { CategoryButton } from './CategoryButton';
import { CommentsButton } from './CommentsButton/CommentsButton';
import { CopyButton } from './CopyButton';
import { DetailsLink } from './DetailsLink';
import { LikesButton } from './LikesButton/LikesButton';
import { Preview } from './Preview';
import { ResourceLink } from './ResourceLink';
import { ShareButton } from './ShareButton';
import { Title } from './Title';
import { TypeButton } from './TypeButton';

interface Props {
  resource: Resource;
  showPreview?: boolean;
}

export const Card = async ({ resource, showPreview }: Props) => {
  // const flags = await featureFlags();
  // const { userId } = auth();

  return (
    <CardPrimitive
      // variant={variant}
      className="group/card @container relative flex h-full w-full flex-col gap-8"
    >
      <DetailsLink slug={resource.id} link={resource.link} />

      <div className="flex flex-1 flex-col items-start gap-8">
        <div className="flex w-full flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Type */}
            {resource.type && (
              <TypeButton typeId={resource.type.id}>
                {resource.type.name}
              </TypeButton>
            )}

            {/* Note */}
            {resource.note && (
              <Tooltip
                content={`Editor's note: ${resource.note}`}
                openOnClick
                className="relative"
              >
                <div>
                  <StickyNote />
                </div>
              </Tooltip>
            )}

            {/* User suggestion */}
            {resource.suggestion && (
              <Tooltip
                content="Resource suggested by the community ❤️"
                openOnClick
                className="relative"
              >
                <div>
                  <Users2 />
                </div>
              </Tooltip>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            {/* Comments */}
            <CommentsButton
              commentsCount={resource.commentsCount}
              slug={resource.id}
            />

            {/* Likes */}
            <LikesButton
              id={resource.id}
              count={resource.likesCount}
              liked={resource.likedByUser}
            />

            {/* Copy Share Link */}
            <ShareButton slug={resource.id} name={resource.name} />
          </div>
        </div>
        <div className="@3xl:flex-row flex w-full flex-col justify-between gap-8">
          <div className="flex flex-col items-start gap-4 sm:mb-16">
            {/* Title */}
            <Title slug={resource.id}>{resource.name}</Title>

            {/* Meta infos */}
            <ul className="text-text-secondary -mt-1 flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-3">
              {resource.date && (
                <li className="flex items-center gap-1">
                  <CalendarDays size="18" className="flex-none" />
                  <Text>{formateDate(resource.date)}</Text>
                </li>
              )}
            </ul>

            {/* Description */}
            {resource.description && (
              <Text className="text-text-secondary">
                {resource.description}
              </Text>
            )}

            {/* Add to collection */}
            {/* {flags.collections && userId && (
              <CollectionButton
                resourceId={resourceId}
                resourceType={resourceType}
              />
            )} */}
          </div>

          {/* Preview */}
          {showPreview && <Preview url={resource.link} id={resource.id} />}
        </div>
      </div>

      <div
        className={`flex flex-wrap gap-3 ${
          resource.category ? 'justify-between' : 'justify-end'
        }`}
      >
        {/* Category */}
        {resource.category && (
          <CategoryButton categoryId={resource.category.id}>
            {resource.category.name}
          </CategoryButton>
        )}

        {/* Link */}
        <div className="flex max-w-full flex-wrap gap-2">
          <ResourceLink
            id={resource.id}
            link={resource.link}
            className="max-w-full"
          >
            <Tag variant="dark">
              <div className="flex max-w-full items-center gap-1">
                <span
                  className="flex-1 truncate"
                  title={getHostname(resource.link)}
                >
                  {getHostname(resource.link)}
                </span>
                <ExternalLink
                  size={16}
                  className="text-text-secondary flex-none"
                />
              </div>
            </Tag>
          </ResourceLink>

          {/* Copy Link Button*/}
          <CopyButton id={resource.id} link={resource.link} />
        </div>
      </div>
    </CardPrimitive>
  );
};
