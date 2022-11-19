import { UilBookReader, UilLinkAlt } from '@iconscout/react-unicons';
import { Newsletter } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  newsletter: Newsletter;
}

export const NewsletterCard = ({ newsletter }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={newsletter.id}
      resourceType={newsletter.type}
      variant="sand"
      displayType="Newsletter"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType:
                  filteredType === 'NEWSLETTER' ? 'ALL' : 'NEWSLETTER',
              });
            }
          : undefined
      }
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
      likes={newsletter.likes}
      showType
    />
  );
};
