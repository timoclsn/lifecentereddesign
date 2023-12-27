import { Tool } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  tool: Tool;
  showPreview?: boolean;
}

export const ToolCard = ({ tool, showPreview }: Props) => {
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
      showPreview={showPreview}
    />
  );
};
