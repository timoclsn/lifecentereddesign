import {
  UilBriefcaseAlt,
  UilLinkAlt,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { Thoughtleader } from 'lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  thoughtleader: Thoughtleader;
}

export const ThoughtleaderCard = ({ thoughtleader }: Props) => {
  return (
    <Card
      resourceId={thoughtleader.id}
      resourceType={thoughtleader.type}
      variant="evening"
      displayType="Thoughtleader"
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
        ...(thoughtleader.topics.length
          ? [
              {
                text: thoughtleader.topics
                  .map((topic) => topic.name)
                  .join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={thoughtleader.category?.name}
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
      suggestion={thoughtleader.suggestion}
      note={thoughtleader.note}
      showType
    />
  );
};
