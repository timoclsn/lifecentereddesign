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
      variant="sky"
      type="Magazine"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'magazine' ? null : 'magazine',
              });
            }
          : undefined
      }
      title={magazine.fields.name}
      category={magazine.fields.category?.at(0)?.fields.name}
      tags={[
        ...(magazine.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(magazine.fields.link),
                url: magazine.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
