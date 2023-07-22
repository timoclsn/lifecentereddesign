'use client';

import { UilBookReader, UilLinkAlt, UilTagAlt } from '@iconscout/react-unicons';
import { Newsletter } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  newsletter: Newsletter;
}

export const NewsletterCard = ({ newsletter }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredByType, filteredByCategory } = state;
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
                type: 'FILTER_BY_TYPE',
                typeIs: 'newsletter',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: newsletter.category?.name,
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
