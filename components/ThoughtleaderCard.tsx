import { UilBriefcaseAlt, UilLinkAlt } from '@iconscout/react-unicons';
import { Thoughtleader } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  thoughtleader: Thoughtleader;
}

export const ThoughtleaderCard = ({ thoughtleader }: Props) => {
  return (
    <Card
      variant="evening"
      type="Thoughtleader"
      title={thoughtleader.Name}
      metaInfos={[
        ...(thoughtleader['Job/Description']
          ? [
              {
                text: thoughtleader['Job/Description'],
                icon: UilBriefcaseAlt,
              },
            ]
          : []),
      ]}
      {...(thoughtleader.Category && {
        category: thoughtleader.Category[0].Name,
      })}
      tags={[
        ...(thoughtleader.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(thoughtleader.Link),
                url: thoughtleader.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
