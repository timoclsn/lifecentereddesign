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
      title={communityOrOrganization.fields.Name}
      category={communityOrOrganization.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(communityOrOrganization.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(communityOrOrganization.fields.Link),
                url: communityOrOrganization.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
