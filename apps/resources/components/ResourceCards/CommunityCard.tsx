import { UilLinkAlt } from '@iconscout/react-unicons';
import { Community } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  community: Community;
}

export const CommunityCard = ({ community }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={community.id}
      resourceType={community.type}
      variant="morning"
      displayType="Community"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'community' ? 'all' : 'community',
              });
            }
          : undefined
      }
      title={community.name}
      category={community.category?.name}
      tags={[
        ...(community.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(community.link),
                url: community.link,
              },
            ]
          : []),
      ]}
      description={community.description}
      showType
    />
  );
};
