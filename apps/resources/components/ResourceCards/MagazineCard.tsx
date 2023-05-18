import { UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Magazine } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  magazine: Magazine;
}

export const MagazineCard = ({ magazine }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
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
                type: 'FILTER_BY_TYPE',
                typeIs: 'magazine',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: magazine.category?.name,
              });
            }
          : undefined
      }
      title={magazine.name}
      metaInfos={[
        ...(magazine.topics.length
          ? [
              {
                text: magazine.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
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
      suggestion={magazine.suggestion}
      note={magazine.note}
      showType
    />
  );
};
