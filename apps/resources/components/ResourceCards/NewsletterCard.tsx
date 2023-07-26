import { UilBookReader, UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Newsletter } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                text: newsletter.authors
                  .map((author) => author.name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(newsletter.authorsPlain
          ? [
              {
                text: newsletter.authorsPlain,
                icon: UilBookReader,
              },
            ]
          : []),
        ...(newsletter.topics.length
          ? [
              {
                text: newsletter.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={newsletter.category?.name}
      tags={[
        ...(newsletter.link
          ? [
              {
                icon: UilLinkAlt,
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
