import { UilBriefcaseAlt, UilLinkAlt } from '@iconscout/react-unicons';
import { Thoughtleader } from '../../lib/content';
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
      variant="evening"
      type="Thoughtleader"
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
      title={thoughtleader.fields.name}
      metaInfos={[
        ...(thoughtleader.fields['job-description']
          ? [
              {
                text: thoughtleader.fields['job-description'],
                icon: UilBriefcaseAlt,
              },
            ]
          : []),
      ]}
      {...(thoughtleader.fields.category && {
        category: thoughtleader.fields.category?.at(0)?.fields.name,
      })}
      tags={[
        ...(thoughtleader.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(thoughtleader.fields.link),
                url: thoughtleader.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
