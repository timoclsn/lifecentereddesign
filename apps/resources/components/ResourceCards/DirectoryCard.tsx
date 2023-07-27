import { Link, Tag } from 'lucide-react';
import { Directory } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  return (
    <Card
      resourceId={directory.id}
      resourceType={directory.type}
      variant="oak"
      displayType="Directory"
      title={directory.name}
      metaInfos={[
        ...(directory.topics.length
          ? [
              {
                text: directory.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={directory.category?.name}
      tags={[
        ...(directory.link
          ? [
              {
                icon: Link,
                text: getHostname(directory.link),
                url: directory.link,
              },
            ]
          : []),
      ]}
      description={directory.description}
      suggestion={directory.suggestion}
      note={directory.note}
      showType
    />
  );
};
