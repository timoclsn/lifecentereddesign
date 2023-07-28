import { Link, Tag } from 'lucide-react';
import { Agency } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                text: agency.topics.map((topic) => topic.name).join(', '),
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
                icon: Link,
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
