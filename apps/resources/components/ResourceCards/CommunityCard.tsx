import { UilLinkAlt } from '@iconscout/react-unicons';
import { Community } from 'lib/content';
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
                filterType: filteredType === 'COMMUNITY' ? 'ALL' : 'COMMUNITY',
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
      likes={community.likes}
      showType
    />
  );
};
