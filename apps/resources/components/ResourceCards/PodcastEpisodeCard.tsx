import {
  UilLinkAlt,
  UilMicrophone,
  UilGrin,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { PodcastEpisode } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={podcastEpisode.id}
      resourceType={podcastEpisode.type}
      variant="sand"
      displayType="Podcast Episode"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'podcastEpisode',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: podcastEpisode.category?.name,
              });
            }
          : undefined
      }
      title={podcastEpisode.title}
      metaInfos={[
        ...(podcastEpisode.podcast
          ? [
              {
                text: podcastEpisode.podcast.title,
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.podcastPlain
          ? [
              {
                text: podcastEpisode.podcastPlain,
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.guests
          ? [
              {
                text: podcastEpisode.guests
                  .map((guest) => guest.name)
                  .join(', '),
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcastEpisode.date
          ? [
              {
                text: new Date(podcastEpisode.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(podcastEpisode.duration
          ? [
              {
                text: `${podcastEpisode.duration} min`,
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={podcastEpisode.category?.name}
      tags={[
        ...(podcastEpisode.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(podcastEpisode.link),
                url: podcastEpisode.link,
              },
            ]
          : []),
      ]}
      suggestion={podcastEpisode.suggestion}
      showType
    />
  );
};
