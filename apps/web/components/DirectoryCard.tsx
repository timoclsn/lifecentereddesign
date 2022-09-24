import { UilLinkAlt } from '@iconscout/react-unicons';
import { Directory } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from 'design-system';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  return (
    <Card
      variant="oak"
      type="Directory"
      title={directory.fields.Name}
      category={directory.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(directory.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(directory.fields.Link),
                url: directory.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
