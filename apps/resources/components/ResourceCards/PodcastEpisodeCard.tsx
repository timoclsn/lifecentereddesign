import {
  UilLinkAlt,
  UilMicrophone,
  UilGrin,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { PodcastEpisode } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
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
                type: 'FILTER',
                filterType:
                  filteredType === 'podcastEpisode' ? 'all' : 'podcastEpisode',
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
      showType
    />
  );
};
