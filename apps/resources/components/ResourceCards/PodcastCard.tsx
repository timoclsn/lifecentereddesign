import { UilGrin, UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Podcast } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={podcast.id}
      resourceType={podcast.type}
      variant="sky"
      displayType="Podcast"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'podcast',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: podcast.category?.name,
              });
            }
          : undefined
      }
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
