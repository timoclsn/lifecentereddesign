import { BookOpen, CalendarDays, Tag } from 'lucide-react';
import { Slide } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

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
                text: thoughtleadersList(slide.authors),
                icon: BookOpen,
              },
            ]
          : []),
        ...(slide.authorsPlain
          ? [
              {
                text: slide.authorsPlain,
                icon: BookOpen,
              },
            ]
          : []),
        ...(slide.date
          ? [
              {
                text: formateDate(slide.date),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(slide.datePlain
          ? [
              {
                text: slide.datePlain,
                icon: CalendarDays,
              },
            ]
          : []),
        ...(slide.topics.length
          ? [
              {
                text: topicsList(slide.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={slide.category?.name}
      tags={[
        ...(slide.link
          ? [
              {
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
