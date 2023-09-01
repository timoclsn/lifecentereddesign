import { Tooltip } from 'design-system';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { getResourceCommentsCountCached } from '../../../lib/cache';
import { ContentType } from '../../../lib/resources';
import { Await } from '../../Await/Await';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const CommentsButton = ({ resourceId, resourceType }: Props) => {
  const commentsCountPromise = getResourceCommentsCountCached(
    resourceId,
    resourceType,
  );
  return (
    <Await promise={commentsCountPromise} loading={<Loading />}>
      {(commentsCount) => {
        return (
          <Link
            href={`/resources/${resourceType}-${resourceId}#cmnts`}
            className="group"
          >
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
      }}
    </Await>
  );
};

const Loading = () => {
  return (
    <div className="ease group flex items-center justify-center gap-2">
      <div>
        <MessageCircle className="animate-pulse" />
      </div>
    </div>
  );
};
