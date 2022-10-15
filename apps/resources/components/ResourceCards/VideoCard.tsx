import {
  UilVideo,
  UilLinkAlt,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { Video } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  video: Video;
}

export const VideoCard = ({ video }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      variant="lime"
      type="Video"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'video' ? null : 'video',
              });
            }
          : undefined
      }
      title={video.fields.title}
      metaInfos={[
        ...(video.fields.thoughtleader
          ? [
              {
                text: video.fields.thoughtleader
                  .map((author) => author?.fields.name)
                  .join(', '),
                icon: UilVideo,
              },
            ]
          : []),
        ...(video.fields.date
          ? [
              {
                text: new Date(video.fields.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(video.fields.duration
          ? [
              {
                text:
                  Math.round(video.fields.duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={video.fields.category?.at(0)?.fields.name}
      tags={[
        ...(video.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(video.fields.link),
                url: video.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
