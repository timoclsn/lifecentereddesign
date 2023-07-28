import { Link, Tag } from 'lucide-react';
import { Magazine } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  magazine: Magazine;
}

export const MagazineCard = ({ magazine }: Props) => {
  return (
    <Card
      resourceId={magazine.id}
      resourceType={magazine.type}
      variant="sky"
      displayType="Magazine"
      title={magazine.name}
      metaInfos={[
        ...(magazine.topics.length
          ? [
              {
                text: magazine.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={magazine.category?.name}
      tags={[
        ...(magazine.link
          ? [
              {
                icon: Link,
                text: getHostname(magazine.link),
                url: magazine.link,
              },
            ]
          : []),
      ]}
      description={magazine.description}
      suggestion={magazine.suggestion}
      note={magazine.note}
      showType
    />
  );
};
