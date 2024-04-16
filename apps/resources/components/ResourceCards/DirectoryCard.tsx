import { Directory } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { topicsList } from '../utils';

interface Props {
  directory: Directory;
  showPreview?: boolean;
}

export const DirectoryCard = ({ directory, showPreview }: Props) => {
  return (
    <ResourceCard
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
      showPreview={showPreview}
    />
  );
};
