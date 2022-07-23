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

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  return (
    <Card
      variant="sand"
      type="Podcast Episode"
      title={podcastEpisode.Title}
      metaInfos={[
        ...(podcastEpisode.Podcast
          ? [
              {
                text: podcastEpisode.Podcast,
                icon: UilMicrophone,
              },
            ]
          : []),
        ...(podcastEpisode.Guest
          ? [
              {
                text: podcastEpisode.Guest.map((guest) => guest.Name).join(
                  ', '
                ),
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcastEpisode.Date
          ? [
              {
                text: new Date(podcastEpisode.Date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(podcastEpisode.Duration
          ? [
              {
                text:
                  Math.round(podcastEpisode.Duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={podcastEpisode.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(podcastEpisode.Link),
          url: podcastEpisode.Link,
        },
      ]}
      showType
    />
  );
};
