import { Resource } from '@/data/resources/query';
import { Tooltip } from '@/design-system';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  commentsCount: number;
  slug: Resource['slug'];
}

export const CommentsButton = ({ commentsCount, slug }: Props) => {
  return (
    <Link
      href={`/resources/${slug}#cmnts`}
      prefetch={false}
      className="group relative"
    >
      <div className="ease flex items-center justify-center gap-2 disabled:opacity-80">
        <div className="transition-transform duration-100 ease-in animate-in fade-in slide-in-from-right-full">
          {commentsCount}
        </div>

        <div>
          <Tooltip content="Comment resource" delayDuration={500}>
            <MessageCircle className="ease transition-transform group-hover:scale-110 group-active:scale-90" />
          </Tooltip>
        </div>
      </div>
    </Link>
  );
};
