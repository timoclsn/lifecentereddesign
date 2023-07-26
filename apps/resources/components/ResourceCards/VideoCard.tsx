import {
  UilCalendarAlt,
  UilClockThree,
  UilLinkAlt,
  UilTagAlt,
  UilVideo,
} from '@iconscout/react-unicons';
import { Video } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
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
                icon: UilVideo,
              },
            ]
          : []),
        ...(video.creatorsPlain
          ? [
              {
                text: video.creatorsPlain,
                icon: UilVideo,
              },
            ]
          : []),
        ...(video.date
          ? [
              {
                text: new Date(video.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(video.duration
          ? [
              {
                text: `${video.duration} min`,
                icon: UilClockThree,
              },
            ]
          : []),
        ...(video.topics.length
          ? [
              {
                text: video.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={video.category?.name}
      tags={[
        ...(video.link
          ? [
              {
                icon: UilLinkAlt,
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
