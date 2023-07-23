'use client';

import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Agency } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../ResourcesTable';

interface Props {
  agency: Agency;
}

export const AgencyCard = ({ agency }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
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
                type: 'FILTER_BY_TYPE',
                typeIs: 'agency',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: agency.category?.name,
              });
            }
          : undefined
      }
      title={agency.name}
      metaInfos={[
        ...(agency.topics.length
          ? [
              {
                text: agency.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
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
      suggestion={agency.suggestion}
      note={agency.note}
      showType
    />
  );
};
