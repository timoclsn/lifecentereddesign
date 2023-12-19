import { Directory } from 'data/resources/query';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  directory: Directory;
}

export const DirectoryCard = ({ directory }: Props) => {
  return (
    <Card
      resourceId={directory.id}
      resourceType={directory.type}
      variant="oak"
      displayType="Directory"
      title={directory.name}
      metaInfos={[
        ...(directory.topics.length
          ? [
              {
                text: topicsList(directory.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={directory.category?.name}
      tags={[
        ...(directory.link
          ? [
              {
                text: getHostname(directory.link),
                url: directory.link,
              },
            ]
          : []),
      ]}
      description={directory.description}
      suggestion={directory.suggestion}
      note={directory.note}
      showType
    />
  );
};
