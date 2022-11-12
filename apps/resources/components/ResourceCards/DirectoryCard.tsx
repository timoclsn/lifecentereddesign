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
      variant="oak"
      type="Directory"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'directory' ? 'all' : 'directory',
              });
            }
          : undefined
      }
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
      description={directory.fields.description}
      showType
    />
  );
};
