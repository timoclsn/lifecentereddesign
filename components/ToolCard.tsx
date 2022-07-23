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
      title={tool.Name}
      category={tool.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(tool.Link),
          url: tool.Link,
        },
      ]}
      showType
    />
  );
};
