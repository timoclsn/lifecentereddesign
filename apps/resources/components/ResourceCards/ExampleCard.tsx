import { Link, Tag } from 'lucide-react';
import { Example } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  example: Example;
}

export const ExampleCard = ({ example }: Props) => {
  return (
    <Card
      resourceId={example.id}
      resourceType={example.type}
      variant="lime"
      displayType="Example"
      title={example.name}
      metaInfos={[
        ...(example.topics.length
          ? [
              {
                text: example.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={example.category?.name}
      tags={[
        ...(example.link
          ? [
              {
                icon: Link,
                text: getHostname(example.link),
                url: example.link,
              },
            ]
          : []),
      ]}
      description={example.description}
      suggestion={example.suggestion}
      note={example.note}
      showType
    />
  );
};
