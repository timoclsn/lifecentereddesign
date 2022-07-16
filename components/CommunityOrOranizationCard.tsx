import { UilLinkAlt } from '@iconscout/react-unicons';
import { CommunityOrOrganization } from '../lib/content';
import { Card } from './Card';

interface Props {
  communityOrOrganization: CommunityOrOrganization;
}

export const CommunityOrOranizationCard = ({
  communityOrOrganization,
}: Props) => {
  return (
    <Card
      variant="communityOrOrganization"
      title={communityOrOrganization.Name}
      category={communityOrOrganization.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: communityOrOrganization['Link Title'],
          url: communityOrOrganization.Link,
        },
      ]}
      showType
    />
  );
};
