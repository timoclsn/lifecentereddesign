import { UilLinkAlt } from '@iconscout/react-unicons';
import { Directory } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={directory.id}
      resourceType={directory.type}
      variant="oak"
      displayType="Directory"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'DIRECTORY' ? 'ALL' : 'DIRECTORY',
              });
            }
          : undefined
      }
      title={directory.name}
      category={directory.category?.name}
      tags={[
        ...(directory.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(directory.link),
                url: directory.link,
              },
            ]
          : []),
      ]}
      description={directory.description}
      likes={directory.likes}
      showType
    />
  );
};
