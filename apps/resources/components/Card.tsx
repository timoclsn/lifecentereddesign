import { CardProps, Heading, Tag, Text } from 'design-system';
import { Card as CardPrimitive } from 'design-system';

interface Props {
  variant: CardProps['variant'];
  type: string;
  onTypeClick?: () => void;
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
}

export const Card = ({
  showType,
  variant,
  type,
  onTypeClick,
  title,
  metaInfos,
  category,
  tags,
}: Props) => {
  const getType = () => {
    if (!!onTypeClick) {
      return (
        <button onClick={onTypeClick} className="hover:opacity-80">
          <Tag variant="outline">{type}</Tag>
        </button>
      );
    }

    return (
      <div>
        <Tag variant="outline">{type}</Tag>
      </div>
    );
  };
  return (
    <CardPrimitive
      variant={variant}
      className="flex h-full w-full flex-col gap-8 sm:gap-24"
    >
      <div className="flex flex-1 flex-col items-start gap-9">
        {/* Type */}
        {showType && getType()}

        <div className="flex flex-col items-start gap-4">
          {/* Title */}
          <Heading
            level="3"
            title={title}
            className="line-clamp-2 sm:line-clamp-none"
          >
            {title}
          </Heading>

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
                      <metaInfo.icon size="18" />
                      <Text>{metaInfo.text}</Text>
                    </Element>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Category */}
      <div
        className={`flex flex-wrap gap-3 ${
          category ? 'justify-between' : 'justify-end'
        }`}
      >
        {category && <Tag variant="light">{category}</Tag>}
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
