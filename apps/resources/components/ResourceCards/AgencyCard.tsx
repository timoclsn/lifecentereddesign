import { UilLinkAlt } from '@iconscout/react-unicons';
import { Agency } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  agency: Agency;
}

export const AgencyCard = ({ agency }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={agency.id}
      resourceType={agency.type}
      variant="morning"
      displayType="Agency"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'agency' ? 'all' : 'agency',
              });
            }
          : undefined
      }
      title={agency.name}
      category={agency.category?.name}
      tags={[
        ...(agency.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(agency.link),
                url: agency.link,
              },
            ]
          : []),
      ]}
      description={agency.description}
      showType
    />
  );
};
