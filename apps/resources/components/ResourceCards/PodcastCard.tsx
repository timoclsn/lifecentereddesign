import { UilGrin, UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Podcast } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcast.hostsPlain
          ? [
              {
                text: podcast.hostsPlain,
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcast.topics.length
          ? [
              {
                text: podcast.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={podcast.category?.name}
      tags={[
        ...(podcast.link
          ? [
              {
                icon: UilLinkAlt,
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
