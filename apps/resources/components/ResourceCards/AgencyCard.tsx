import { Tag } from 'lucide-react';
import { Agency } from '../../lib/resources';
import { getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  agency: Agency;
}

export const AgencyCard = ({ agency }: Props) => {
  return (
    <Card
      resourceId={agency.id}
      resourceType={agency.type}
      variant="morning"
      displayType="Agency"
      title={agency.name}
      metaInfos={[
        ...(agency.topics.length
          ? [
              {
                text: topicsList(agency.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={agency.category?.name}
      tags={[
        ...(agency.link
          ? [
              {
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
