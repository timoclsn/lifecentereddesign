import { UilLinkAlt } from '@iconscout/react-unicons';
import { Directory } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="oak"
      type="Directory"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'directory' });
      }}
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
