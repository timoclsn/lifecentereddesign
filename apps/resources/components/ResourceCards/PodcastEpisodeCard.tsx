import {
  UilCalendarAlt,
  UilClockThree,
  UilGrin,
  UilLinkAlt,
  UilMicrophone,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { PodcastEpisode } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  podcastEpisode: PodcastEpisode;
}

export const PodcastEpisodeCard = ({ podcastEpisode }: Props) => {
  return (
    <Card
      resourceId={podcastEpisode.id}
      resourceType={podcastEpisode.type}
      variant="sand"
      displayType="Podcast Episode"
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
        ...(podcastEpisode.topics.length
          ? [
              {
                text: podcastEpisode.topics
                  .map((topic) => topic.name)
                  .join(', '),
                icon: UilTagAlt,
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
      note={podcastEpisode.note}
      showType
    />
  );
};
