import { Link, Tag } from 'lucide-react';
import { Community } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                text: community.topics.map((topic) => topic.name).join(', '),
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
                icon: Link,
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
