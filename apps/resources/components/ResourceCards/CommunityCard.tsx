import { Community } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { topicsList } from '../utils';

interface Props {
  community: Community;
  showPreview?: boolean;
}

export const CommunityCard = ({ community, showPreview }: Props) => {
  return (
    <ResourceCard
      resourceId={community.id}
      resourceType={community.type}
      variant="morning"
      displayType="Community"
      title={community.name}
      metaInfos={[
        ...(community.topics.length
          ? [
              {
                text: topicsList(community.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={community.category?.name}
      tags={[
        ...(community.link
          ? [
              {
                text: getHostname(community.link),
                url: community.link,
              },
            ]
          : []),
      ]}
      description={community.description}
      suggestion={community.suggestion}
      note={community.note}
      showType
      showPreview={showPreview}
    />
  );
};
