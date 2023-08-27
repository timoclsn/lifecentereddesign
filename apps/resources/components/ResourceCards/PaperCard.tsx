import { BookOpen, CalendarDays, Link, Newspaper, Tag } from 'lucide-react';
import { Paper } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { topicsList } from '../utils';

interface Props {
  paper: Paper;
}

export const PaperCard = ({ paper }: Props) => {
  return (
    <Card
      resourceId={paper.id}
      resourceType={paper.type}
      variant="forest"
      displayType="Paper"
      title={paper.title}
      metaInfos={[
        ...(paper.authors.length
          ? [
              {
                text: topicsList(paper.topics),
                icon: BookOpen,
              },
            ]
          : []),
        ...(paper.authorsPlain
          ? [
              {
                text: paper.authorsPlain,
                icon: BookOpen,
              },
            ]
          : []),
        ...(paper.date
          ? [
              {
                text: formateDate(paper.date),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(paper.datePlain
          ? [
              {
                text: paper.datePlain,
                icon: CalendarDays,
              },
            ]
          : []),
        ...(paper.journal
          ? [
              {
                text: paper.journal,
                icon: Newspaper,
              },
            ]
          : []),
        ...(paper.topics.length
          ? [
              {
                text: paper.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={paper.category?.name}
      tags={[
        ...(paper.link
          ? [
              {
                icon: Link,
                text: getHostname(paper.link),
                url: paper.link,
              },
            ]
          : []),
      ]}
      suggestion={paper.suggestion}
      note={paper.note}
      showType
    />
  );
};
