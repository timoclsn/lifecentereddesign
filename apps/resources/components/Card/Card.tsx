import {
  Card as CardPrimitive,
  CardProps,
  Heading,
  Tag,
  Text,
  Tooltip,
} from 'design-system';
import { ExternalLink, StickyNote, Users2 } from 'lucide-react';
import { ContentType } from '../../lib/resources';
import { CategoryButton } from './CategoryButton';
import { CopyLink } from './CopyLink';
import { CopyShareLink } from './CopyShareLink';
import { LikesButton } from './LikesButton/LikesButton';
import { ResourceLink } from './ResourceLink';
import { TypeButton } from './TypeButton';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  variant: CardProps['variant'];
  displayType: string;
  title: string;
  showType?: boolean;
  metaInfos?: Array<{
    icon: any;
    text: string;
    url?: string;
  }>;
  category?: string;
  tags?: Array<{
    icon: any;
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

  const getTitle = () => {
    const heading = (
      <Heading
        level="3"
        title={title}
        className="line-clamp-2 sm:line-clamp-none"
      >
        {title}
        {resourceLink && (
          <span>
            {' '}
            <ExternalLink size={18} className="inline align-baseline" />
          </span>
        )}
      </Heading>
    );

    if (resourceLink) {
      return (
        <ResourceLink
          href={resourceLink}
          resourceType={resourceType}
          resourceTitle={resourceType}
        >
          {heading}
        </ResourceLink>
      );
    }
    return heading;
  };

  return (
    <CardPrimitive
      variant={variant}
      className="flex h-full w-full flex-col gap-8 sm:gap-24"
    >
      <div className="flex flex-1 flex-col items-start gap-9">
        <div className="relative flex w-full justify-between">
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

          <div className="flex items-center justify-center gap-2">
            {/* Likes */}
            <LikesButton
              resourceId={resourceId}
              resourceType={resourceType}
              resourceTitle={title}
            />

            {/* Copy Share Link */}
            <CopyShareLink
              resourceId={resourceId}
              resourceType={resourceType}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4">
          {/* Title */}
          {getTitle()}

          {/* Meta infos */}
          {metaInfos && (
            <ul className="text-text-secondary -mt-1 flex flex-wrap gap-x-2 gap-y-1 sm:gap-x-8 sm:gap-y-3">
              {metaInfos.map((metaInfo, idx) => {
                const Element = metaInfo.url ? 'a' : 'span';
                return (
                  <li key={idx}>
                    <Element
                      className={`flex items-center gap-1${
                        metaInfo.url ? ' underline' : ''
                      }${Element === 'a' ? ' hover:opacity-80' : ''}`}
                      {...(metaInfo.url && {
                        href: metaInfo.url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                    >
                      <metaInfo.icon size="18" className="flex-none" />
                      <Text>{metaInfo.text}</Text>
                    </Element>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Description */}
          {description && (
            <Text className="text-text-secondary">{description}</Text>
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
              <a
                key={idx}
                href={tag.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <Tag variant="dark">
                  <div className="flex items-center gap-1">
                    <tag.icon size="18" />
                    <span>{tag.text}</span>
                  </div>
                </Tag>
              </a>
            ))}

            {/* Copy Link Button*/}
            {resourceLink && <CopyLink link={resourceLink} />}
          </div>
        )}
      </div>
    </CardPrimitive>
  );
};
