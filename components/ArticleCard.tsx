import {
  UilBookReader,
  UilClockThree,
  UilCalendarAlt,
  UilLinkAlt,
} from '@iconscout/react-unicons';
import { Article } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <Card
      variant="article"
      title={article.Title}
      metaInfos={[
        ...(article['Author(s)']
          ? [
              {
                text: article['Author(s)']
                  .map((author) => author.Name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(article.Date
          ? [
              {
                text: new Date(article.Date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(article.Duration
          ? [
              {
                text: (article.Duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={article.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(article.Link),
          url: article.Link,
        },
      ]}
      showType
    />
  );
};
