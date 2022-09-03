import { Tag } from './Tag';

const variants = {
  oak: 'bg-oak',
  forest: 'bg-forest',
  evening: 'bg-evening',
  lime: 'bg-lime',
  sand: 'bg-sand',
  sky: 'bg-sky',
  stone: 'bg-stone',
  morning: 'bg-morning',
} as const;

interface Props {
  variant: keyof typeof variants;
  type: string;
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
  title,
  metaInfos,
  category,
  tags,
}: Props) => {
  return (
    <div
      className={`rounded-4xl p-8 pt-10 ${variants[variant]} flex h-full w-full flex-col gap-8 sm:gap-24`}
    >
      <div className="flex flex-1 flex-col items-start gap-9">
        {/* Type */}
        {showType && (
          <div>
            <Tag variant="outline">{type}</Tag>
          </div>
        )}

        <div className="flex flex-col items-start gap-4">
          {/* Title */}
          <h2
            title={title}
            className="font-serif text-xl font-bold line-clamp-2 sm:text-3xl sm:line-clamp-none"
          >
            {title}
          </h2>

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
                      <span>{metaInfo.text}</span>
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
        {tags?.length > 0 && (
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
    </div>
  );
};
