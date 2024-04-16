import { Tooltip } from '@/components/design-system';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface Props {
  commentsCount: number;
  slug: string;
}

export const CommentsButton = ({ commentsCount, slug }: Props) => {
  return (
    <Link href={`/resources/${slug}#cmnts`} className="group relative">
      <div className="ease flex items-center justify-center gap-2 disabled:opacity-80">
        <div className="animate-in slide-in-from-right-full fade-in transition-transform duration-100 ease-in">
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
