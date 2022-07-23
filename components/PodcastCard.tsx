import { UilLinkAlt, UilGrin } from '@iconscout/react-unicons';
import { Podcast } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  return (
    <Card
      variant="sky"
      type="Podcast"
      title={podcast.Name}
      metaInfos={[
        ...(podcast['Host(s)']
          ? [
              {
                text: podcast['Host(s)'].join(', '),
                icon: UilGrin,
              },
            ]
          : []),
      ]}
      category={podcast.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(podcast.Link),
          url: podcast.Link,
        },
      ]}
      showType
    />
  );
};
