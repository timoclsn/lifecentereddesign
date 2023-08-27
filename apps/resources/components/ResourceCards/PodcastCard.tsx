import { Smile, Link, Tag } from 'lucide-react';
import { Podcast } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  return (
    <Card
      resourceId={podcast.id}
      resourceType={podcast.type}
      variant="sky"
      displayType="Podcast"
      title={podcast.title}
      metaInfos={[
        ...(podcast.hosts.length
          ? [
              {
                text: podcast.hosts.map((host) => host.name).join(', '),
                icon: Smile,
              },
            ]
          : []),
        ...(podcast.hostsPlain
          ? [
              {
                text: podcast.hostsPlain,
                icon: Smile,
              },
            ]
          : []),
        ...(podcast.topics.length
          ? [
              {
                text: topicsList(podcast.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={podcast.category?.name}
      tags={[
        ...(podcast.link
          ? [
              {
                icon: Link,
                text: getHostname(podcast.link),
                url: podcast.link,
              },
            ]
          : []),
      ]}
      suggestion={podcast.suggestion}
      note={podcast.note}
      showType
    />
  );
};
