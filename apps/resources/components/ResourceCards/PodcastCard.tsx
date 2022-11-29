import { UilGrin, UilLinkAlt } from '@iconscout/react-unicons';
import { Podcast } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
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
                type: 'FILTER',
                filterType: filteredType === 'podcast' ? 'all' : 'podcast',
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
      showType
    />
  );
};
