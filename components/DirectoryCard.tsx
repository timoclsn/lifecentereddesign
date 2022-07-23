import { UilLinkAlt } from '@iconscout/react-unicons';
import { Directory } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  return (
    <Card
      variant="oak"
      type="Directory"
      title={directory.Name}
      category={directory.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(directory.Link),
          url: directory.Link,
        },
      ]}
      showType
    />
  );
};
