import { UilLinkAlt } from '@iconscout/react-unicons';
import { Tool } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={tool.id}
      resourceType={tool.type}
      variant="stone"
      displayType="Tool"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'tool' ? 'all' : 'tool',
              });
            }
          : undefined
      }
      title={tool.name}
      category={tool.name}
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
      showType
    />
  );
};
