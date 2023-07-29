import { CalendarDays, Clock3, Link, Mic, Smile, Tag } from 'lucide-react';
import { PodcastEpisode } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils';
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
                icon: Mic,
              },
            ]
          : []),
        ...(podcastEpisode.podcastPlain
          ? [
              {
                text: podcastEpisode.podcastPlain,
                icon: Mic,
              },
            ]
          : []),
        ...(podcastEpisode.guests
          ? [
              {
                text: podcastEpisode.guests
                  .map((guest) => guest.name)
                  .join(', '),
                icon: Smile,
              },
            ]
          : []),
        ...(podcastEpisode.date
          ? [
              {
                text: formateDate(podcastEpisode.date),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(podcastEpisode.duration
          ? [
              {
                text: `${podcastEpisode.duration} min`,
                icon: Clock3,
              },
            ]
          : []),
        ...(podcastEpisode.topics.length
          ? [
              {
                text: podcastEpisode.topics
                  .map((topic) => topic.name)
                  .join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={podcastEpisode.category?.name}
      tags={[
        ...(podcastEpisode.link
          ? [
              {
                icon: Link,
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
