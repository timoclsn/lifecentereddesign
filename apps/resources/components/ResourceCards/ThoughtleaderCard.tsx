import { Thoughtleader } from 'lib/resources';
import { Briefcase, Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

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
                icon: Briefcase,
              },
            ]
          : []),
        ...(thoughtleader.topics.length
          ? [
              {
                text: topicsList(thoughtleader.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={thoughtleader.category?.name}
      tags={[
        ...(thoughtleader.link
          ? [
              {
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
