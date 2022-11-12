import { UilLinkAlt } from '@iconscout/react-unicons';
import { Tool } from '../../lib/content';
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
      variant="stone"
      type="Tool"
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
      description={tool.fields.description}
      showType
    />
  );
};
