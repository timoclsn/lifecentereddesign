import { UilLinkAlt } from '@iconscout/react-unicons';
import { Tool } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="stone"
      type="Tool"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'tool' });
      }}
      title={tool.fields.name}
      category={tool.fields.category?.at(0)?.fields.name}
      tags={[
        ...(tool.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(tool.fields.link),
                url: tool.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
