import { AtSign, Link, Tag } from 'lucide-react';
import { SocialMediaProfile } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  socielaMediaProfile: SocialMediaProfile;
}

export const SocialMediaProfileCard = ({ socielaMediaProfile }: Props) => {
  return (
    <Card
      resourceId={socielaMediaProfile.id}
      resourceType={socielaMediaProfile.type}
      variant="lime"
      displayType="Social Media Profile"
      title={socielaMediaProfile.name}
      metaInfos={[
        ...(socielaMediaProfile.handle
          ? [
              {
                text: socielaMediaProfile.handle,
                icon: AtSign,
              },
            ]
          : []),
        ...(socielaMediaProfile.topics.length
          ? [
              {
                text: topicsList(socielaMediaProfile.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={socielaMediaProfile.category?.name}
      tags={[
        ...(socielaMediaProfile.link
          ? [
              {
                icon: Link,
                text: getHostname(socielaMediaProfile.link),
                url: socielaMediaProfile.link,
              },
            ]
          : []),
      ]}
      description={socielaMediaProfile.description}
      suggestion={socielaMediaProfile.suggestion}
      note={socielaMediaProfile.note}
      showType
    />
  );
};
