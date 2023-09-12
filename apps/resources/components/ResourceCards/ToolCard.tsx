import { Tag } from 'lucide-react';
import { Tool } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

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
                text: topicsList(tool.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={tool.category?.name}
      tags={[
        ...(tool.link
          ? [
              {
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
