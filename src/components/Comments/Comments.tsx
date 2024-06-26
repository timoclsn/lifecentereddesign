import { SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { query } from '@/api/query';
import { Button, Container, Heading, InfoBox, Text } from '@/design-system';
import { AlertTriangle } from 'lucide-react';
import { AutoAnimate } from '../AutoAnimate/AutoAnimate';
import { Await } from '../Await/Await';
import { AddCommentForm } from './AddCommentForm';
import { Comment } from './Comment';

interface Props {
  slug: string;
}

export const Comments = ({ slug }: Props) => {
  const resourcePromise = query.resources.getResourceBySlug({
    slug,
  });

  return (
    <Await promise={resourcePromise}>
      {({ id }) => {
        const commentsPromise = query.resources.getResourceComments({
          id,
        });

        return (
          <section id="cmnts">
            <Container>
              <div className="mx-auto flex w-full max-w-lg flex-col gap-12">
                <Heading level="2">Comments</Heading>
                <SignedIn>
                  <AddCommentForm id={id} />
                </SignedIn>
                <SignedOut>
                  <div className="flex h-16 w-full flex-col items-stretch justify-center">
                    <SignInButton>
                      <Button>Sign in to add comment</Button>
                    </SignInButton>
                  </div>
                </SignedOut>
                <div>
                  <Heading level="3" className="mb-8">
                    All comments
                  </Heading>
                  <Await
                    promise={commentsPromise}
                    loading={<Loading />}
                    error={<Error />}
                  >
                    {(comments) => {
                      return (
                        <>
                          {comments.length > 0 ? (
                            <AutoAnimate as="ul" className="space-y-8">
                              {comments.map((comment, index) => (
                                <li key={comment.id}>
                                  <Comment
                                    resourceId={id}
                                    commentId={comment.id}
                                    userId={comment.userId}
                                    username={
                                      comment.user?.username ?? 'anonymous'
                                    }
                                    createdAt={comment.createdAt}
                                    avatarUrl={comment.user?.imageUrl}
                                    text={comment.text}
                                  />
                                  {index !== comments.length - 1 && (
                                    <div className="mt-8 h-0.5 w-full bg-stone" />
                                  )}
                                </li>
                              ))}
                            </AutoAnimate>
                          ) : (
                            <div>
                              <Text className="text-text-primary">
                                Be the first to leave a comment…
                              </Text>
                            </div>
                          )}
                        </>
                      );
                    }}
                  </Await>
                </div>
              </div>
            </Container>
          </section>
        );
      }}
    </Await>
  );
};

const Loading = () => {
  const items = 5;
  return (
    <div className="flex flex-col gap-8">
      {Array(items)
        .fill(0)
        .map((_, index) => {
          return (
            <div key={index}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-stone" />
                  <div className="h-6 flex-1 animate-pulse rounded-md bg-stone" />
                </div>
                <div className="h-16 w-full animate-pulse rounded-md bg-stone" />
              </div>
              {index !== items - 1 && (
                <div className="mt-8 h-0.5 w-full animate-pulse bg-stone" />
              )}
            </div>
          );
        })}
    </div>
  );
};

const Error = () => {
  return (
    <InfoBox
      variant="error"
      icon={<AlertTriangle />}
      className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
    >
      Something went wrong loading the comments. Please try again.
    </InfoBox>
  );
};
