import { UilLinkAlt } from '@iconscout/react-unicons';
import { CommunityOrOrganization } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  communityOrOrganization: CommunityOrOrganization;
}

export const CommunityOrOranizationCard = ({
  communityOrOrganization,
}: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      variant="morning"
      type="Community or Organization"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType:
                  filteredType === 'communityOrOrganization'
                    ? null
                    : 'communityOrOrganization',
              });
            }
          : undefined
      }
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
