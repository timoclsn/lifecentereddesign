import {
  UilBookReader,
  UilCalendarAlt,
  UilLinkAlt,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { Slide } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  slide: Slide;
}

export const SlideCard = ({ slide }: Props) => {
  return (
    <Card
      resourceId={slide.id}
      resourceType={slide.type}
      variant="evening"
      displayType="Slide"
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
        ...(slide.date
          ? [
              {
                text: new Date(slide.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(slide.datePlain
          ? [
              {
                text: slide.datePlain,
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(slide.topics.length
          ? [
              {
                text: slide.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
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
      suggestion={slide.suggestion}
      note={slide.note}
      showType
    />
  );
};
