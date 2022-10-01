import { UilLinkAlt, UilGrin } from '@iconscout/react-unicons';
import { Podcast } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from 'design-system';

interface Props {
  podcast: Podcast;
}

export const PodcastCard = ({ podcast }: Props) => {
  return (
    <Card
      variant="sky"
      type="Podcast"
      title={podcast.fields.Name}
      metaInfos={[
        ...(podcast.fields['Host(s)']
          ? [
              {
                text: podcast.fields['Host(s)'].join(', '),
                icon: UilGrin,
              },
            ]
          : []),
      ]}
      category={podcast.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(podcast.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(podcast.fields.Link),
                url: podcast.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
