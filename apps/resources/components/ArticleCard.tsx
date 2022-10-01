import {
  UilBookReader,
  UilClockThree,
  UilCalendarAlt,
  UilLinkAlt,
} from '@iconscout/react-unicons';
import { Card } from 'design-system';
import { Article } from '../lib/content';
import { getHostname } from '../lib/utils';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  return (
    <Card
      variant="forest"
      type="Article"
      title={article.fields.Title}
      metaInfos={[
        ...(article.fields['Author(s)']
          ? [
              {
                text: article.fields['Author(s)']
                  .map((author) => author?.fields.Name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(article.fields.Date
          ? [
              {
                text: new Date(article.fields.Date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(article.fields.Duration
          ? [
              {
                text: (article.fields.Duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={article.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(article.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(article.fields.Link),
                url: article.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
