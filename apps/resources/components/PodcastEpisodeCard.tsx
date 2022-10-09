import {
  UilLinkAlt,
  UilMicrophone,
  UilGrin,
  UilCalendarAlt,
  UilClockThree,
} from '@iconscout/react-unicons';
import { PodcastEpisode } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="sand"
      type="Podcast Episode"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'podcastEpisode' });
      }}
      title={podcastEpisode.fields.Title}
      metaInfos={[
        ...(podcastEpisode.fields.Podcast
          ? [
              {
                text: podcastEpisode.fields.Podcast,
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.fields.Guest
          ? [
              {
                text: podcastEpisode.fields.Guest.map(
                  (guest) => guest?.fields.Name
                ).join(', '),
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcastEpisode.fields.Date
          ? [
              {
                text: new Date(podcastEpisode.fields.Date).toLocaleDateString(
                  'en'
                ),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(podcastEpisode.fields.Duration
          ? [
              {
                text:
                  Math.round(podcastEpisode.fields.Duration / 60).toString() +
                  ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={podcastEpisode.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(podcastEpisode.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(podcastEpisode.fields.Link),
                url: podcastEpisode.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
