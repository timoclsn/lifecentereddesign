import {
  UilVideo,
  UilLinkAlt,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { Video } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  video: Video;
}

export const VideoCard = ({ video }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={video.id}
      resourceType={video.type}
      variant="lime"
      displayType="Video"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'video',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: video.category?.name,
              });
            }
          : undefined
      }
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
