import {
  UilBookReader,
  UilCalendarAlt,
  UilLinkAlt,
  UilNewspaper,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { Paper } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
      // onTypeClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_TYPE',
      //           typeIs: 'paper',
      //         });
      //       }
      //     : undefined
      // }
      // onCategoryClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_CATEGORY',
      //           category: paper.category?.name,
      //         });
      //       }
      //     : undefined
      // }
      title={paper.title}
      metaInfos={[
        ...(paper.authors.length
          ? [
              {
                text: paper.authors.map((author) => author?.name).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(paper.authorsPlain
          ? [
              {
                text: paper.authorsPlain,
                icon: UilBookReader,
              },
            ]
          : []),
        ...(paper.date
          ? [
              {
                text: new Date(paper.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(paper.datePlain
          ? [
              {
                text: paper.datePlain,
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(paper.journal
          ? [
              {
                text: paper.journal,
                icon: UilNewspaper,
              },
            ]
          : []),
        ...(paper.topics.length
          ? [
              {
                text: paper.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={paper.category?.name}
      tags={[
        ...(paper.link
          ? [
              {
                icon: UilLinkAlt,
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
