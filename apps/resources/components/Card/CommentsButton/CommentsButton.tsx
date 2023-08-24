import { Await } from 'components/Await/Await';
import { ContentType, getResourceCommentsCountCached } from 'lib/resources';
import { MessageCircle } from 'lucide-react';
import { CommentsLink } from './CommentsLink';

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
          <CommentsLink resourceId={resourceId} resourceType={resourceType}>
            <div className="ease group flex items-center justify-center gap-2 disabled:opacity-80">
              <div className="animate-in slide-in-from-right-full fade-in transition-transform duration-100 ease-in">
                {commentsCount}
              </div>

              <div>
                <MessageCircle className="ease transition-transform group-hover:scale-110 group-active:scale-90" />
              </div>
            </div>
          </CommentsLink>
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
