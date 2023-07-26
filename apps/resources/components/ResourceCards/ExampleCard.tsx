import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
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
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={example.category?.name}
      tags={[
        ...(example.link
          ? [
              {
                icon: UilLinkAlt,
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
