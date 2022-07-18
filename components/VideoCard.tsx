import {
  UilVideo,
  UilLinkAlt,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { Video } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  video: Video;
}

export const VideoCard = ({ video }: Props) => {
  return (
    <Card
      variant="video"
      title={video.Title}
      metaInfos={[
        ...(video.Thoughtleader
          ? [
              {
                text: video.Thoughtleader.map((author) => author.Name).join(
                  ', '
                ),
                icon: UilVideo,
              },
            ]
          : []),
        ...(video.Date
          ? [
              {
                text: new Date(video.Date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(video.Duration
          ? [
              {
                text: Math.round(video.Duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={video.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(video.Link),
          url: video.Link,
        },
      ]}
      showType
    />
  );
};
