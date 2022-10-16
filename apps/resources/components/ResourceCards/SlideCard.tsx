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
      variant="evening"
      type="Slide"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'slide' ? null : 'slide',
              });
            }
          : undefined
      }
      title={slide.fields.title}
      metaInfos={[
        ...(slide.fields.thoughtleader
          ? [
              {
                text: slide.fields.thoughtleader
                  .map((author) => author?.fields.name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(slide.fields.author
          ? [
              {
                text: slide.fields.author,
                icon: UilBookReader,
              },
            ]
          : []),
      ]}
      category={slide.fields.category?.at(0)?.fields.name}
      tags={[
        ...(slide.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(slide.fields.link),
                url: slide.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
