'use client';

import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Tool } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../ResourcesTable';

interface Props {
  tool: Tool;
}

export const ToolCard = ({ tool }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
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
                type: 'FILTER_BY_TYPE',
                typeIs: 'tool',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: tool.category?.name,
              });
            }
          : undefined
      }
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
