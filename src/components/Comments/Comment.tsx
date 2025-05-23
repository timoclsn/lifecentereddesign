import { auth } from '@clerk/nextjs/server';
import { formatDistance, parseISO } from 'date-fns';
import { Heading, Text } from '@/design-system';
import { Avatar } from './Avatar';
import { DeleteCommentButton } from './DeleteCommentButton';

interface Props {
  resourceId: number;
  commentId: number;
  userId: string;
  username: string;
  createdAt: Date;
  avatarUrl?: string;
  text: string;
}

export const Comment = async ({
  resourceId,
  commentId,
  userId,
  username,
  createdAt,
  avatarUrl,
  text,
}: Props) => {
  const { userId: authedUserId } = await auth();
  const isAuthedUser = authedUserId === userId;
  const timeStamp =
    typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar url={avatarUrl} username={username} />
          <div className="flex items-baseline gap-2">
            <Heading as="p" level="5">
              {username}
            </Heading>
            <Text size="small" className="text-text-secondary">
              {`${formatDistance(timeStamp, new Date())} ago`}
            </Text>
          </div>
        </div>
        {isAuthedUser && (
          <DeleteCommentButton
            resourceId={resourceId}
            commentId={commentId}
            commentUserId={userId}
          />
        )}
      </div>
      <Text className="text-text-primary">{text}</Text>
    </div>
  );
};
