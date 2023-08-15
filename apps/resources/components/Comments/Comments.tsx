import { Await } from 'components/Await/Await';
import { ContentType, getResourceComments } from 'lib/resources';
import { AddCommentForm } from './AddCommentForm';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const Comments = ({ resourceId, resourceType }: Props) => {
  const commentsPromise = getResourceComments(resourceId, resourceType);
  return (
    <section>
      <AddCommentForm resourceId={resourceId} resourceType={resourceType} />
      <div>
        Comments:
        <Await
          promise={commentsPromise}
          loading={<div>Loading…</div>}
          error={<div>Error!</div>}
        >
          {(comments) => {
            return (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    {comment.user.username}: {comment.text}
                  </li>
                ))}
              </ul>
            );
          }}
        </Await>
      </div>
    </section>
  );
};
