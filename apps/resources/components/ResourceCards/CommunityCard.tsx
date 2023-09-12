import { Tag } from 'lucide-react';
import { Community } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  community: Community;
}

export const CommunityCard = ({ community }: Props) => {
  return (
    <Card
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
    />
  );
};
