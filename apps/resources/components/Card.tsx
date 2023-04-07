import { useAuth } from '@clerk/nextjs';
import { UilHeart, UilUsersAlt } from '@iconscout/react-unicons';
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
import { ReactNode } from 'react';
import { trpc } from 'utils/trpc';

const heartVariants = cva(null, {
  variants: {
    interactive: {
      true: 'group-hover:scale-110 group-active:scale-90',
    },
    loading: {
      true: 'animate-pulse',
    },
    liked: {
      true: 'text-red-700',
    },
  },
});

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
}: Props) => {
  const { userId } = useAuth();
  const utils = trpc.useContext();
  const input = { id: resourceId, type: resourceType };

  const { data: likesData, isLoading: likesIsLoading } =
    trpc.resources.likes.useQuery(input);

  const likeMutation = trpc.resources.like.useMutation({
    onMutate: () => {
      utils.resources.likes.cancel(input);

      const oldData = utils.resources.likes.getData(input);
      if (!oldData) return;

      utils.resources.likes.setData(input, {
        count: oldData.count + 1,
        liked: true,
      });

      return { oldData };
    },
    onSuccess: () => {
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

  const getTitle = (title: ReactNode) => {
    const resourceLink = tags?.at(0)?.url;
    if (resourceLink) {
      return (
        <Link
          href={resourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          {title}
        </Link>
      );
    }
    return title;
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

            {/* User suggestion? */}
            {suggestion && (
              <Tooltip content="Resource suggested by the community ❤️">
                <div>
                  <UilUsersAlt />
                </div>
              </Tooltip>
            )}
          </div>

          {/* Likes */}
          <button
            onClick={likesData?.liked ? unlikeResource : likeResource}
            disabled={likesIsLoading || !userId}
            className="ease group flex items-center justify-center gap-2 transition-transform disabled:opacity-80"
          >
            {likesData && (
              <div className="animate-in slide-in-from-right-full fade-in duration-100 ease-in">
                {likesData.count}
              </div>
            )}
            <Tooltip
              content={
                !!userId
                  ? likesData?.liked
                    ? 'Remove resource from your favourites'
                    : 'Like resource to show support and mark as favourites'
                  : 'Sign-in to like resource and show your support.'
              }
              delayDuration={500}
            >
              <div>
                <UilHeart
                  className={heartVariants({
                    loading: likesIsLoading,
                    liked: likesData?.liked,
                    interactive: !!userId,
                  })}
                />
              </div>
            </Tooltip>
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          {/* Title */}
          {getTitle(
            <Heading
              level="3"
              title={title}
              className="line-clamp-2 sm:line-clamp-none"
            >
              {title}
            </Heading>
          )}

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

      {/* Category */}
      <div
        className={`flex flex-wrap gap-3 ${
          category ? 'justify-between' : 'justify-end'
        }`}
      >
        {category && getCategory(<Tag variant="light">{category}</Tag>)}
        {tags && tags.length > 0 && (
          <ul className="flex gap-8">
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
          </ul>
        )}
      </div>
    </CardPrimitive>
  );
};
