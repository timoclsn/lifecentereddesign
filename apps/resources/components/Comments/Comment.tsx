import { formatDistance, parseISO } from 'date-fns';
import { Heading, Text } from 'design-system';
import { Avatar } from './Avatar';

interface Props {
  username: string;
  createdAt: Date;
  avatarUrl: string;
  text: string;
}

export const Comment = ({ username, createdAt, avatarUrl, text }: Props) => {
  const timeStamp =
    typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
  return (
    <div className="flex flex-col gap-3">
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
      <Text className="text-text-primary">{text}</Text>
    </div>
  );
};
