import {
  UilBookReader,
  UilCalendarAlt,
  UilClockThree,
  UilLinkAlt,
} from '@iconscout/react-unicons';
import { Report } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  report: Report;
}

export const ReportCard = ({ report }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
  return (
    <Card
      resourceId={report.id}
      resourceType={report.type}
      variant="oak"
      displayType="Report"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_TYPE',
                typeIs: 'report',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: report.category?.name,
              });
            }
          : undefined
      }
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
      showType
    />
  );
};
