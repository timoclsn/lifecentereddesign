import { UilLinkAlt, UilGrin } from '@iconscout/react-unicons';
import { Podcast } from '../lib/content';
import { Card } from './Card';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  return (
    <Card
      variant="podcast"
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
          text: podcast['Link Title'],
          url: podcast.Link,
        },
      ]}
      showType
    />
  );
};
