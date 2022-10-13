import { UilLinkAlt } from '@iconscout/react-unicons';
import { CommunityOrOrganization } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  communityOrOrganization: CommunityOrOrganization;
}

export const CommunityOrOranizationCard = ({
  communityOrOrganization,
}: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="morning"
      type="Community or Organization"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'communityOrOrganization' });
      }}
      title={communityOrOrganization.fields.name}
      category={communityOrOrganization.fields.category?.at(0)?.fields.name}
      tags={[
        ...(communityOrOrganization.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(communityOrOrganization.fields.link),
                url: communityOrOrganization.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
