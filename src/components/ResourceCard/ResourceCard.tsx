import { creatorList, topicsList } from '@/components/utils';
import { Resource } from '@/data/resources/query';
import {
  Card as CardPrimitive,
  ColorVariant,
  Tag,
  Text,
  Tooltip,
} from '@/design-system';
import { formateDate, getHostname } from '@/lib/utils/utils';
import {
  CalendarDays,
  ExternalLink,
  StickyNote,
  TagIcon,
  Users2,
} from 'lucide-react';
import { CategoryButton } from './CategoryButton';
import { CommentsButton } from './CommentsButton/CommentsButton';
import { CopyButton } from './CopyButton';
import { Details } from './Details';
import { DetailsLink } from './DetailsLink';
import { LikesButton } from './LikesButton/LikesButton';
import { Preview } from './Preview';
import { ResourceLink } from './ResourceLink';
import { ShareButton } from './ShareButton';
import { Title } from './Title';
import { TypeButton } from './TypeButton';

const variantsMap: Record<string, ColorVariant> = {
  Agency: 'morning',
  Article: 'forest',
  Book: 'oak',
  Community: 'morning',
  Course: 'evening',
  Directory: 'oak',
  Example: 'lime',
  Magazine: 'sky',
  Newsletter: 'sand',
  Paper: 'forest',
  Podcast: 'sky',
  'Podcast Episode': 'sand',
  Report: 'oak',
  Slide: 'evening',
  'Social Media Profile': 'lime',
  Thoughtleader: 'evening',
  Tool: 'stone',
  Video: 'lime',
};

interface Props {
  resource: Resource;
  showPreview?: boolean;
}

export const ResourceCard = async ({ resource, showPreview }: Props) => {
  return (
    <CardPrimitive
      variant={
        resource.type?.name ? variantsMap[resource.type.name] : undefined
      }
      className="group/card relative flex h-full w-full flex-col gap-8 @container"
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
        <div className="flex w-full flex-col justify-between gap-8 @3xl:flex-row">
          <div className="flex flex-col items-start gap-4 sm:mb-16">
            {/* Title */}
            <Title slug={resource.id}>{resource.name}</Title>

            {/* Meta infos */}
            <ul className="-mt-1 flex flex-wrap gap-x-2 gap-y-1 text-text-secondary sm:gap-x-8 sm:gap-y-3">
              {resource.creators.length > 0 && (
                <li className="flex items-center gap-1">
                  <Users2 size="18" className="flex-none" />
                  <Text>{creatorList(resource.creators)}</Text>
                </li>
              )}
              {resource.creatorsPlain && (
                <li className="flex items-center gap-1">
                  <Users2 size="18" className="flex-none" />
                  <Text>{resource.creatorsPlain}</Text>
                </li>
              )}
              {resource.date && (
                <li className="flex items-center gap-1">
                  <CalendarDays size="18" className="flex-none" />
                  <Text>{formateDate(resource.date)}</Text>
                </li>
              )}
              {resource.datePlain && (
                <li className="flex items-center gap-1">
                  <CalendarDays size="18" className="flex-none" />
                  <Text>{resource.datePlain}</Text>
                </li>
              )}
              {resource.topics.length > 0 && (
                <li className="flex items-center gap-1">
                  <TagIcon size="18" className="flex-none" />
                  <Text>{topicsList(resource.topics)}</Text>
                </li>
              )}
            </ul>

            {/* Description */}
            {resource.description && (
              <Text className="text-text-secondary">
                {resource.description}
              </Text>
            )}

            {/* Details */}
            {resource.details && (
              <Details slug={resource.id}>{resource.details}</Details>
            )}
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
                  className="flex-none text-text-secondary"
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
