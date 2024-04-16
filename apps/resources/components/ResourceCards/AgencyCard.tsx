import { Agency } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { topicsList } from '../utils';

interface Props {
  agency: Agency;
  showPreview?: boolean;
}

export const AgencyCard = ({ agency, showPreview }: Props) => {
  return (
    <ResourceCard
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
      showPreview={showPreview}
    />
  );
};
