import { UilLinkAlt } from '@iconscout/react-unicons';
import { Tool } from '../lib/content';
import { Card } from './Card';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  return (
    <Card
      variant="tool"
      title={tool.Name}
      category={tool.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: tool['Link Title'],
          url: tool.Link,
        },
      ]}
      showType
    />
  );
};
