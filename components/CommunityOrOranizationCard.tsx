import { UilLinkAlt } from '@iconscout/react-unicons';
import { CommunityOrOrganization } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  communityOrOrganization: CommunityOrOrganization;
}

export const CommunityOrOranizationCard = ({
  communityOrOrganization,
}: Props) => {
  return (
    <Card
      variant="morning"
      type="Community or Organization"
      title={communityOrOrganization.Name}
      category={communityOrOrganization.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(communityOrOrganization.Link),
          url: communityOrOrganization.Link,
        },
      ]}
      showType
    />
  );
};
