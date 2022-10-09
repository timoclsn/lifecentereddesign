import { UilBriefcaseAlt, UilLinkAlt } from '@iconscout/react-unicons';
import { Thoughtleader } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  thoughtleader: Thoughtleader;
}

export const ThoughtleaderCard = ({ thoughtleader }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="evening"
      type="Thoughtleader"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'thoughtleader' });
      }}
      title={thoughtleader.fields.Name}
      metaInfos={[
        ...(thoughtleader.fields['Job/Description']
          ? [
              {
                text: thoughtleader.fields['Job/Description'],
                icon: UilBriefcaseAlt,
              },
            ]
          : []),
      ]}
      {...(thoughtleader.fields.Category && {
        category: thoughtleader.fields.Category?.at(0)?.fields.Name,
      })}
      tags={[
        ...(thoughtleader.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(thoughtleader.fields.Link),
                url: thoughtleader.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
