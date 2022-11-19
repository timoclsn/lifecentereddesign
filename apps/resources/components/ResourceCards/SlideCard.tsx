import { UilBookReader, UilLinkAlt } from '@iconscout/react-unicons';
import { Slide } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  slide: Slide;
}

export const SlideCard = ({ slide }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={slide.id}
      resourceType={slide.type}
      variant="evening"
      displayType="Slide"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'SLIDE' ? 'ALL' : 'SLIDE',
              });
            }
          : undefined
      }
      title={slide.title}
      metaInfos={[
        ...(slide.authors.length
          ? [
              {
                text: slide.authors.map((author) => author.name).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(slide.authorsPlain
          ? [
              {
                text: slide.authorsPlain,
                icon: UilBookReader,
              },
            ]
          : []),
      ]}
      category={slide.category?.name}
      tags={[
        ...(slide.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(slide.link),
                url: slide.link,
              },
            ]
          : []),
      ]}
      likes={slide.likes}
      showType
    />
  );
};
