import { Example } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  example: Example;
  showPreview?: boolean;
}

export const ExampleCard = ({ example, showPreview }: Props) => {
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
                text: topicsList(example.topics),
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
      showPreview={showPreview}
    />
  );
};
