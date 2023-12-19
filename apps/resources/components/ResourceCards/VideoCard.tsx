import { Video } from 'data/resources/query';
import { CalendarDays, Clock3, Tag, VideoIcon } from 'lucide-react';
import { formateDate, getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

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
                text: thoughtleadersList(video.creators),
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
                text: topicsList(video.topics),
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
