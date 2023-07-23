'use client';

import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Example } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../ResourcesTable';

interface Props {
  example: Example;
}

export const ExampleCard = ({ example }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={example.id}
      resourceType={example.type}
      variant="lime"
      displayType="Example"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'example',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: example.category?.name,
              });
            }
          : undefined
      }
      title={example.name}
      metaInfos={[
        ...(example.topics.length
          ? [
              {
                text: example.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={example.category?.name}
      tags={[
        ...(example.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(example.link),
                url: example.link,
              },
            ]
          : []),
      ]}
      description={example.description}
      suggestion={example.suggestion}
      note={example.note}
      showType
    />
  );
};
