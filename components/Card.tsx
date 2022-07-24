import { Tag } from './Tag';

const variants = {
  oak: 'bg-oak',
  forest: 'bg-forest',
  evening: 'bg-evening',
  grass: 'bg-grass',
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
      className={`rounded-4xl p-8 ${variants[variant]} flex h-full w-full flex-col gap-24`}
    >
      <div className="flex flex-1 flex-col gap-5">
        {/* Type */}
        {showType && (
          <div>
            <Tag variant="dark">{type}</Tag>
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold">{title}</h2>

        {/* Meta infos */}
        {metaInfos && (
          <ul className="-mt-1 flex flex-wrap gap-x-8 gap-y-3 opacity-80">
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
