import { UilBriefcaseAlt, UilLinkAlt } from '@iconscout/react-unicons';
import { Thoughtleader } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  thoughtleader: Thoughtleader;
}

export const ThoughtleaderCard = ({ thoughtleader }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={thoughtleader.id}
      resourceType={thoughtleader.type}
      variant="evening"
      displayType="Thoughtleader"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType:
                  filteredType === 'thoughtleader' ? 'all' : 'thoughtleader',
              });
            }
          : undefined
      }
      title={thoughtleader.name}
      metaInfos={[
        ...(thoughtleader.jobDescription
          ? [
              {
                text: thoughtleader.jobDescription,
                icon: UilBriefcaseAlt,
              },
            ]
          : []),
      ]}
      {...(thoughtleader.category && {
        category: thoughtleader.category.name,
      })}
      tags={[
        ...(thoughtleader.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(thoughtleader.link),
                url: thoughtleader.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
