import { auth } from '@clerk/nextjs';
import {
  Card as CardPrimitive,
  CardProps,
  Tag,
  Text,
  Tooltip,
} from 'design-system';
import { featureFlags } from 'lib/featureFlags';
import { ContentType } from 'lib/resources';
import { isExternalUrl } from 'lib/utils/utils';
import { ExternalLink, LucideIcon, StickyNote, Users2 } from 'lucide-react';
import { ReactNode } from 'react';
import { CategoryButton } from './CategoryButton';
import { CollectionButton } from './CollectionButton';
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

export const Card = async ({
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
  const flags = await featureFlags();
  const resourceLink = tags?.at(0)?.url;
  const { userId } = auth();

  return (
    <CardPrimitive
      variant={variant}
      className="group/card @container relative flex h-full w-full flex-col gap-8"
    >
      <DetailsLink
        resourceId={resourceId}
        resourceType={resourceType}
        resourceLink={resourceLink}
      />

      <div className="flex flex-1 flex-col items-start gap-8">
        <div className="flex w-full flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Type */}
            {showType && (
              <TypeButton type={resourceType}>{displayType}</TypeButton>
            )}

            {/* Note */}
            {note && (
              <Tooltip
                content={`Editor's note: ${note}`}
                openOnClick
                className="relative"
              >
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
        <div className="flex w-full justify-between gap-4">
          <div className="flex flex-col items-start gap-4 sm:mb-16">
            {/* Title */}
            <Title
              resourceId={resourceId}
              resourceType={resourceType}
              resourceLink={resourceLink}
            >
              {title}
            </Title>

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
            {flags.collections && userId && (
              <CollectionButton
                resourceId={resourceId}
                resourceType={resourceType}
              />
            )}
          </div>

          {/* Preview */}
          {resourceLink && <Preview url={resourceLink} />}
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
                      <ExternalLink size={16} className="text-text-secondary" />
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
  );
};
