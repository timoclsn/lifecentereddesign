import { UilHeart } from '@iconscout/react-unicons';
import {
  Card as CardPrimitive,
  CardProps,
  Heading,
  Tag,
  Text,
} from 'design-system';
import { ContentType } from 'lib/resources';
import Link from 'next/link';
import { ReactNode } from 'react';
import { trpc } from 'utils/trpc';

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
}: Props) => {
  const utils = trpc.useContext();

  const { data, isLoading } = trpc.resources.likes.useQuery(
    {
      id: resourceId,
      type: resourceType,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const mutation = trpc.resources.like.useMutation({
    onMutate: (input) => {
      utils.resources.likes.cancel(input);

      const oldData = utils.resources.likes.getData(input);
      if (!oldData) return;

      const newData = {
        likes: oldData.likes + 1,
      };

      utils.resources.likes.setData(input, newData);

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
      utils.resources.likes.invalidate({
        id: resourceId,
        type: resourceType,
      });
    },
  });

  const likeResource = () => {
    mutation.mutate({ id: resourceId, type: resourceType });
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
        {/* Type */}
        <div className="flex justify-between w-full">
          <div>
            {showType && getType(<Tag variant="outline">{displayType}</Tag>)}
          </div>
          <button
            onClick={likeResource}
            disabled={isLoading}
            className="flex gap-2 group transition-transform ease disabled:opacity-80"
          >
            {data ? data.likes : '…'}
            <UilHeart className="group-hover:scale-110 group-active:scale-90" />
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
            <ul className="-mt-1 flex flex-wrap gap-x-2 gap-y-1 text-text-secondary sm:gap-y-3 sm:gap-x-8">
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
