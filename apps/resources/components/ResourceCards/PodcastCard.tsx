import { Podcast } from 'lib/resources';
import { Smile, Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { thoughtleadersList, topicsList } from '../utils';

interface Props {
  podcast: Podcast;
  showPreview?: boolean;
}

export const PodcastCard = ({ podcast, showPreview }: Props) => {
  return (
    <ResourceCard
      resourceId={podcast.id}
      resourceType={podcast.type}
      variant="sky"
      displayType="Podcast"
      title={podcast.title}
      metaInfos={[
        ...(podcast.hosts.length
          ? [
              {
                text: thoughtleadersList(podcast.hosts),
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
                text: getHostname(podcast.link),
                url: podcast.link,
              },
            ]
          : []),
      ]}
      suggestion={podcast.suggestion}
      note={podcast.note}
      showType
      showPreview={showPreview}
    />
  );
};
