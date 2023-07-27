import { BookOpen, CalendarDays, Link, Tag } from 'lucide-react';
import { Report } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                text: report.authors.map((author) => author?.name).join(', '),
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
                text: new Date(report.date).toLocaleDateString('en'),
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
                text: report.topics.map((topic) => topic.name).join(', '),
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
                icon: Link,
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
