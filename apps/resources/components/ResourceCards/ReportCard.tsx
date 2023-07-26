import {
  UilBookReader,
  UilCalendarAlt,
  UilLinkAlt,
  UilTagAlt,
} from '@iconscout/react-unicons';
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
                icon: UilBookReader,
              },
            ]
          : []),
        ...(report.authorsPlain
          ? [
              {
                text: report.authorsPlain,
                icon: UilBookReader,
              },
            ]
          : []),
        ...(report.date
          ? [
              {
                text: new Date(report.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(report.datePlain
          ? [
              {
                text: report.datePlain,
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(report.topics.length
          ? [
              {
                text: report.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={report.category?.name}
      tags={[
        ...(report.link
          ? [
              {
                icon: UilLinkAlt,
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
