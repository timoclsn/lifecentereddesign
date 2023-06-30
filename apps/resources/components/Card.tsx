import { useAuth } from '@clerk/nextjs';
import {
  UilCheck,
  UilCopyAlt,
  UilExternalLinkAlt,
  UilHeart,
  UilNotes,
  UilUsersAlt,
} from '@iconscout/react-unicons';
import { cva } from 'class-variance-authority';
import {
  Card as CardPrimitive,
  CardProps,
  Heading,
  Tag,
  Text,
  Tooltip,
} from 'design-system';
import { ContentType } from 'lib/resources';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { trpc } from 'utils/trpc';
import { SolidHeart } from './Icons/SolidHeart';

const heartVariants = cva(
  'group-hover:scale-110 group-active:scale-90 transition-transform ease',
  {
    variants: {
      loading: {
        true: 'animate-pulse',
      },
      active: {
        true: 'text-red-700',
      },
    },
  }
);

interface Props {
  resourceId: number;
  resourceType: ContentType;
  variant: CardProps['variant'];
  displayType: string;
  onTypeClick?: () => void;
  onCategoryClick?: () => void;
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
  onTypeClick,
  onCategoryClick,
  title,
  metaInfos,
  category,
  tags,
  description,
  suggestion = false,
  note,
}: Props) => {
  const { isSignedIn } = useAuth();
  const utils = trpc.useContext();
  const input = { id: resourceId, type: resourceType };
  const resourceLink = tags?.at(0)?.url;

  const { data: likesData, isLoading: likesIsLoading } =
    trpc.resources.likes.useQuery(input);

  const likeMutation = trpc.resources.like.useMutation({
    onMutate: () => {
      utils.resources.likes.cancel(input);

      const oldData = utils.resources.likes.getData(input);
      if (!oldData) return;

      utils.resources.likes.setData(input, {
        count: oldData.count + 1,
        liked: !!isSignedIn, // Anonymous likes should not fill the heart
      });

      return { oldData };
    },
    onSuccess: () => {
      utils.resources.liked.invalidate();
      splitbee.track('Like resource', {
        type: resourceType,
        name: title,
      });
    },
    onError: (err, input, context) => {
      utils.resources.likes.setData(input, context?.oldData);
    },
    onSettled: () => {
      utils.resources.likes.invalidate(input);
    },
  });

  const unlikeMutation = trpc.resources.unlike.useMutation({
    onMutate: () => {
      utils.resources.likes.cancel(input);

      const oldData = utils.resources.likes.getData(input);
      if (!oldData) return;

      utils.resources.likes.setData(input, {
        count: oldData.count - 1,
        liked: false,
      });

      return { oldData };
    },
    onSuccess: () => {
      utils.resources.liked.invalidate();
      splitbee.track('Un-like resource', {
        type: resourceType,
        name: title,
      });
    },
    onError: (err, input, context) => {
      utils.resources.likes.setData(input, context?.oldData);
    },
    onSettled: () => {
      utils.resources.likes.invalidate(input);
    },
  });

  const likeResource = () => {
    likeMutation.mutate(input);
  };

  const unlikeResource = () => {
    unlikeMutation.mutate(input);
  };

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
            <UilExternalLinkAlt size={18} className="inline align-baseline" />
          </span>
        )}
      </Heading>
    );

    if (resourceLink) {
      return (
        <Link
          href={resourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          {heading}
        </Link>
      );
    }
    return heading;
  };

  const getType = (type: ReactNode) => {
    if (!!onTypeClick) {
      return (
        <button onClick={onTypeClick} className="hover:opacity-80">
          {type}
        </button>
      );
    }
    return type;
  };

  const getCategory = (category: ReactNode) => {
    if (!!onCategoryClick) {
      return (
        <button onClick={onCategoryClick} className="hover:opacity-80">
          {category}
        </button>
      );
    }
    return category;
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
            {showType && getType(<Tag variant="outline">{displayType}</Tag>)}

            {/* Note */}
            {note && (
              <Tooltip content={`Editor's note: ${note}`} openOnClick>
                <div>
                  <UilNotes />
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
                  <UilUsersAlt />
                </div>
              </Tooltip>
            )}
          </div>

          {/* Likes */}
          <button
            onClick={likesData?.liked ? unlikeResource : likeResource}
            disabled={likesIsLoading}
            className="ease group flex items-center justify-center gap-2 disabled:opacity-80"
          >
            {likesData && (
              <div className="animate-in slide-in-from-right-full fade-in transition-transform duration-100 ease-in">
                {likesData.count}
              </div>
            )}
            <Tooltip
              content={
                isSignedIn
                  ? likesData?.liked
                    ? 'Remove resource from your favourites'
                    : 'Like resource to show support and mark as favourite'
                  : 'Like resource anonymously or sign-in to add resource to your favourites'
              }
              delayDuration={500}
            >
              <div>
                {likesData?.liked ? (
                  <SolidHeart
                    className={heartVariants({
                      loading: likesIsLoading,
                      active: likesData.liked,
                    })}
                  />
                ) : (
                  <UilHeart
                    className={heartVariants({
                      loading: likesIsLoading,
                    })}
                  />
                )}
              </div>
            </Tooltip>
          </button>
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
        {category && getCategory(<Tag variant="light">{category}</Tag>)}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <li key={idx}>
                <a
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
              </li>
            ))}

            {/* Copy Link Button*/}
            {resourceLink && <CopyButton link={resourceLink} />}
          </ul>
        )}
      </div>
    </CardPrimitive>
  );
};

interface CopyButtonProps {
  link: string;
}

const CopyButton = ({ link }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Tooltip content="Copy resource link" delayDuration={500}>
      <button className="flex items-stretch" onClick={handleClick}>
        <Tag variant="dark">
          <div className="flex items-center gap-1">
            {copied ? <UilCheck size="18" /> : <UilCopyAlt size="18" />}
            <span className="sr-only">Copy resource link</span>
          </div>
        </Tag>
      </button>
    </Tooltip>
  );
};
