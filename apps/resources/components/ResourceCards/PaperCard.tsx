import { Paper } from 'lib/resources';
import { BookOpen, CalendarDays, Newspaper, Tag } from 'lucide-react';
import { formateDate, getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

interface Props {
  paper: Paper;
  showPreview?: boolean;
}

export const PaperCard = ({ paper, showPreview }: Props) => {
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
                text: thoughtleadersList(paper.authors),
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
                text: topicsList(paper.topics),
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
                text: getHostname(paper.link),
                url: paper.link,
              },
            ]
          : []),
      ]}
      suggestion={paper.suggestion}
      note={paper.note}
      showType
      showPreview={showPreview}
    />
  );
};
