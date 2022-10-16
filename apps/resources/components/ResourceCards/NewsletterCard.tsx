import { UilLinkAlt } from '@iconscout/react-unicons';
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
      variant="sand"
      type="Newsletter"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'newsletter' ? null : 'newsletter',
              });
            }
          : undefined
      }
      title={newsletter.fields.name}
      category={newsletter.fields.category?.at(0)?.fields.name}
      tags={[
        ...(newsletter.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(newsletter.fields.link),
                url: newsletter.fields.link,
              },
            ]
          : []),
      ]}
      description={newsletter.fields.description}
      showType
    />
  );
};
