import {
  UilVideo,
  UilLinkAlt,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { Video } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  video: Video;
}

export const VideoCard = ({ video }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="lime"
      type="Video"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'video' });
      }}
      title={video.fields.Title}
      metaInfos={[
        ...(video.fields.Thoughtleader
          ? [
              {
                text: video.fields.Thoughtleader.map(
                  (author) => author?.fields.Name
                ).join(', '),
                icon: UilVideo,
              },
            ]
          : []),
        ...(video.fields.Date
          ? [
              {
                text: new Date(video.fields.Date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(video.fields.Duration
          ? [
              {
                text:
                  Math.round(video.fields.Duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={video.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(video.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(video.fields.Link),
                url: video.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
