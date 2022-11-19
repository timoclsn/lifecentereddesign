import { UilLinkAlt } from '@iconscout/react-unicons';
import { Example } from 'lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  example: Example;
}

export const ExampleCard = ({ example }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
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
                type: 'FILTER',
                filterType: filteredType === 'EXAMPLE' ? 'ALL' : 'EXAMPLE',
              });
            }
          : undefined
      }
      title={example.name}
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
      likes={example.likes}
      showType
    />
  );
};
