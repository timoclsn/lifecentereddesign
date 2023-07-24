import {
  UilBookReader,
  UilCalendarAlt,
  UilClockThree,
  UilLinkAlt,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { Article } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <Card
      resourceId={article.id}
      resourceType={article.type}
      variant="forest"
      displayType="Article"
      // onTypeClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_TYPE',
      //           typeIs: 'article',
      //         });
      //       }
      //     : undefined
      // }
      // onCategoryClick={
      //   inContext
      //     ? () => {
      //         dispatch({
      //           type: 'FILTER_BY_CATEGORY',
      //           category: article.category?.name,
      //         });
      //       }
      //     : undefined
      // }
      title={article.title}
      metaInfos={[
        ...(article.authors.length
          ? [
              {
                text: article.authors.map((author) => author?.name).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(article.authorsPlain
          ? [
              {
                text: article.authorsPlain,
                icon: UilBookReader,
              },
            ]
          : []),
        ...(article.date
          ? [
              {
                text: new Date(article.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(article.datePlain
          ? [
              {
                text: article.datePlain,
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(article.duration
          ? [
              {
                text: `${article.duration} min`,
                icon: UilClockThree,
              },
            ]
          : []),
        ...(article.topics.length
          ? [
              {
                text: article.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
              },
            ]
          : []),
      ]}
      category={article.category?.name}
      tags={[
        ...(article.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(article.link),
                url: article.link,
              },
            ]
          : []),
      ]}
      suggestion={article.suggestion}
      note={article.note}
      showType
    />
  );
};
