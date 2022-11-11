import { UilGrin, UilLinkAlt } from '@iconscout/react-unicons';
import { Podcast } from '../../lib/content';
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
      variant="sky"
      type="Podcast"
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
      title={podcast.fields.name}
      metaInfos={[
        ...(podcast.fields.host
          ? [
              {
                text: podcast.fields.host,
                icon: UilGrin,
              },
            ]
          : []),
        ...(podcast.fields.thoughtleader
          ? [
              {
                text: podcast.fields.thoughtleader
                  .map((thoughtleader) => thoughtleader?.fields.name)
                  .join(', '),
                icon: UilGrin,
              },
            ]
          : []),
      ]}
      category={podcast.fields.category?.at(0)?.fields.name}
      tags={[
        ...(podcast.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(podcast.fields.link),
                url: podcast.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
