import { BookOpen, CalendarDays, Tag } from 'lucide-react';
import { Report } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

interface Props {
  report: Report;
}

export const ReportCard = ({ report }: Props) => {
  return (
    <Card
      resourceId={report.id}
      resourceType={report.type}
      variant="oak"
      displayType="Report"
      title={report.title}
      metaInfos={[
        ...(report.authors.length
          ? [
              {
                text: thoughtleadersList(report.authors),
                icon: BookOpen,
              },
            ]
          : []),
        ...(report.authorsPlain
          ? [
              {
                text: report.authorsPlain,
                icon: BookOpen,
              },
            ]
          : []),
        ...(report.date
          ? [
              {
                text: formateDate(report.date),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(report.datePlain
          ? [
              {
                text: report.datePlain,
                icon: CalendarDays,
              },
            ]
          : []),
        ...(report.topics.length
          ? [
              {
                text: topicsList(report.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={report.category?.name}
      tags={[
        ...(report.link
          ? [
              {
                text: getHostname(report.link),
                url: report.link,
              },
            ]
          : []),
      ]}
      description={report.description}
      suggestion={report.suggestion}
      note={report.note}
      showType
    />
  );
};
