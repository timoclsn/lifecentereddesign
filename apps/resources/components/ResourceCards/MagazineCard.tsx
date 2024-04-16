import { Magazine } from 'lib/resources';
import { Tag } from 'lucide-react';
import { getHostname } from '../../lib/utils/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';
import { topicsList } from '../utils';

interface Props {
  magazine: Magazine;
  showPreview?: boolean;
}

export const MagazineCard = ({ magazine, showPreview }: Props) => {
  return (
    <ResourceCard
      resourceId={magazine.id}
      resourceType={magazine.type}
      variant="sky"
      displayType="Magazine"
      title={magazine.name}
      metaInfos={[
        ...(magazine.topics.length
          ? [
              {
                text: topicsList(magazine.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={magazine.category?.name}
      tags={[
        ...(magazine.link
          ? [
              {
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
      showPreview={showPreview}
    />
  );
};
