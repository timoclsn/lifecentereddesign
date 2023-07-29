import { CalendarDays, Clock3, Link, Tag, VideoIcon } from 'lucide-react';
import { Video } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  video: Video;
}

export const VideoCard = ({ video }: Props) => {
  return (
    <Card
      resourceId={video.id}
      resourceType={video.type}
      variant="lime"
      displayType="Video"
      title={video.title}
      metaInfos={[
        ...(video.creators.length
          ? [
              {
                text: video.creators.map((creator) => creator.name).join(', '),
                icon: VideoIcon,
              },
            ]
          : []),
        ...(video.creatorsPlain
          ? [
              {
                text: video.creatorsPlain,
                icon: VideoIcon,
              },
            ]
          : []),
        ...(video.date
          ? [
              {
                text: formateDate(video.date),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(video.duration
          ? [
              {
                text: `${video.duration} min`,
                icon: Clock3,
              },
            ]
          : []),
        ...(video.topics.length
          ? [
              {
                text: video.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={video.category?.name}
      tags={[
        ...(video.link
          ? [
              {
                icon: Link,
                text: getHostname(video.link),
                url: video.link,
              },
            ]
          : []),
      ]}
      suggestion={video.suggestion}
      note={video.note}
      showType
    />
  );
};
