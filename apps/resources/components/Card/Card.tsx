import { OpenServerDialog } from 'components/ServerDialog/OpenServerDialog';
import {
  Card as CardPrimitive,
  CardProps,
  Heading,
  Tag,
  Text,
  Tooltip,
} from 'design-system';
import { isExternalUrl } from 'lib/utils';
import { ExternalLink, LucideIcon, StickyNote, Users2 } from 'lucide-react';
import { ReactNode } from 'react';
import { ContentType } from '../../lib/resources';
import { CategoryButton } from './CategoryButton';
import { CommentsButton } from './CommentsButton/CommentsButton';
import { CopyButton } from './CopyButton';
import { DetailsLink } from './DetailsLink';
import { HoverProvider } from './HoverProvider';
import { LikesButton } from './LikesButton/LikesButton';
import { ResourceLink } from './ResourceLink';
import { ShareButton } from './ShareButton';
import { TypeButton } from './TypeButton';
import { auth } from '@clerk/nextjs';
import { CollectionButton } from './CollectionButton';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  variant: CardProps['variant'];
  displayType: string;
  title: string;
  showType?: boolean;
  metaInfos?: Array<{
    icon: LucideIcon;
    text: string | ReactNode;
  }>;
  category?: string;
  tags?: Array<{
    icon?: LucideIcon;
    text: string;
    url: string;
  }>;
  description?: string | null;
  suggestion?: boolean;
  note?: string | null;
}

export const Card = ({
  resourceId,
  resourceType,
  showType,
  variant,
  displayType,
  title,
  metaInfos,
  category,
  tags,
  description,
  suggestion = false,
  note,
}: Props) => {
  const resourceLink = tags?.at(0)?.url;
  const { userId } = auth();

  return (
    <HoverProvider resourceId={resourceId} resourceType={resourceType}>
      <CardPrimitive
        variant={variant}
        className="relative flex h-full w-full flex-col gap-8 sm:gap-24"
      >
        <DetailsLink resourceId={resourceId} resourceType={resourceType} />

        <div className="flex flex-1 flex-col items-start gap-9">
          <div className="flex w-full flex-wrap justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Type */}
              {showType && (
                <TypeButton type={resourceType}>{displayType}</TypeButton>
              )}

              {/* Note */}
              {note && (
                <Tooltip content={`Editor's note: ${note}`} openOnClick>
                  <div>
                    <StickyNote />
                  </div>
                </Tooltip>
              )}

              {/* User suggestion */}
              {suggestion && (
                <Tooltip
                  content="Resource suggested by the community ❤️"
                  openOnClick
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
                resourceId={resourceId}
                resourceType={resourceType}
              />

              {/* Likes */}
              <LikesButton
                resourceId={resourceId}
                resourceType={resourceType}
                resourceTitle={title}
              />

              {/* Copy Share Link */}
              <ShareButton
                title={title}
                resourceId={resourceId}
                resourceType={resourceType}
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            {/* Title */}
            <Heading
              level="3"
              title={title}
              className="group-hover/card:pointer-events-none group-hover/card:cursor-pointer group-hover/card:underline"
            >
              {title}
            </Heading>

            {/* Meta infos */}
            {metaInfos && (
              <ul className="text-text-secondary -mt-1 flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-3">
                {metaInfos.map((metaInfo, idx) => {
                  return (
                    <li key={idx} className="flex items-center gap-1">
                      <metaInfo.icon size="18" className="flex-none" />
                      <Text>{metaInfo.text}</Text>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Description */}
            {description && (
              <Text className="text-text-secondary">{description}</Text>
            )}

            {/* Add to collection */}
            {userId && (
              <CollectionButton
                resourceId={resourceId}
                resourceType={resourceType}
              />
            )}
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-3 ${
            category ? 'justify-between' : 'justify-end'
          }`}
        >
          {/* Category */}
          {category && (
            <CategoryButton category={category}>{category}</CategoryButton>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <ResourceLink
                  key={idx}
                  href={tag.url}
                  resourceType={resourceType}
                  resourceTitle={title}
                >
                  <Tag variant="dark">
                    <div className="flex items-center gap-1">
                      {tag.icon && <tag.icon size="18" />}
                      <span>{tag.text}</span>
                      {isExternalUrl(tag.url) && (
                        <ExternalLink
                          size={16}
                          className="text-text-secondary"
                        />
                      )}
                    </div>
                  </Tag>
                </ResourceLink>
              ))}

              {/* Copy Link Button*/}
              {resourceLink && <CopyButton link={resourceLink} />}
            </div>
          )}
        </div>
      </CardPrimitive>
    </HoverProvider>
  );
};
