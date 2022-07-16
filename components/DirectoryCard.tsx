import { UilLinkAlt } from '@iconscout/react-unicons';
import { Directory } from '../lib/content';
import { Card } from './Card';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  return (
    <Card
      variant="directory"
      title={directory.Name}
      category={directory.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: directory['Link Title'],
          url: directory.Link,
        },
      ]}
      showType
    />
  );
};
