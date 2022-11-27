import { UilLinkAlt } from '@iconscout/react-unicons';
import { Magazine } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  magazine: Magazine;
}

export const MagazineCard = ({ magazine }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={magazine.id}
      resourceType={magazine.type}
      variant="sky"
      displayType="Magazine"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'magazine' ? 'all' : 'magazine',
              });
            }
          : undefined
      }
      title={magazine.name}
      category={magazine.category?.name}
      tags={[
        ...(magazine.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(magazine.link),
                url: magazine.link,
              },
            ]
          : []),
      ]}
      description={magazine.description}
      showType
    />
  );
};
