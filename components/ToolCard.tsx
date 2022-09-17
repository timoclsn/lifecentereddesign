import { UilLinkAlt } from '@iconscout/react-unicons';
import { Tool } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  return (
    <Card
      variant="stone"
      type="Tool"
      title={tool.fields.Name}
      category={tool.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(tool.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(tool.fields.Link),
                url: tool.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
