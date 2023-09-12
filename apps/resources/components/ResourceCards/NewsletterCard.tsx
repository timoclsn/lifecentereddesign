import { BookOpen, Tag } from 'lucide-react';
import { Newsletter } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

interface Props {
  newsletter: Newsletter;
}

export const NewsletterCard = ({ newsletter }: Props) => {
  return (
    <Card
      resourceId={newsletter.id}
      resourceType={newsletter.type}
      variant="sand"
      displayType="Newsletter"
      title={newsletter.name}
      metaInfos={[
        ...(newsletter.authors.length
          ? [
              {
                text: thoughtleadersList(newsletter.authors),
                icon: BookOpen,
              },
            ]
          : []),
        ...(newsletter.authorsPlain
          ? [
              {
                text: newsletter.authorsPlain,
                icon: BookOpen,
              },
            ]
          : []),
        ...(newsletter.topics.length
          ? [
              {
                text: topicsList(newsletter.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={newsletter.category?.name}
      tags={[
        ...(newsletter.link
          ? [
              {
                text: getHostname(newsletter.link),
                url: newsletter.link,
              },
            ]
          : []),
      ]}
      description={newsletter.description}
      suggestion={newsletter.suggestion}
      note={newsletter.note}
      showType
    />
  );
};
