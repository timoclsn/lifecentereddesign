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
      variant="morning"
      type="Agency"
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
      title={agency.fields.name}
      category={agency.fields.category?.at(0)?.fields.name}
      tags={[
        ...(agency.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(agency.fields.link),
                url: agency.fields.link,
              },
            ]
          : []),
      ]}
      description={agency.fields.description}
      showType
    />
  );
};
