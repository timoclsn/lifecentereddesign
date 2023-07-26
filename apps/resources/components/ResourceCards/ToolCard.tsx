import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Tool } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  return (
    <Card
      resourceId={tool.id}
      resourceType={tool.type}
      variant="stone"
      displayType="Tool"
      title={tool.name}
      metaInfos={[
        ...(tool.topics.length
          ? [
              {
                text: tool.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={tool.category?.name}
      tags={[
        ...(tool.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(tool.link),
                url: tool.link,
              },
            ]
          : []),
      ]}
      description={tool.description}
      suggestion={tool.suggestion}
      note={tool.note}
      showType
    />
  );
};
