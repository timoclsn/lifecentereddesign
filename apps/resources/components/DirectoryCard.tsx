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
      title={directory.fields.name}
      category={directory.fields.category?.at(0)?.fields.name}
      tags={[
        ...(directory.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(directory.fields.link),
                url: directory.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
