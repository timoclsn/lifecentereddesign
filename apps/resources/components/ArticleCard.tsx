import {
  UilBookReader,
  UilCalendarAlt,
  UilClockThree,
  UilLinkAlt,
} from '@iconscout/react-unicons';
import { Article } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';
import { useResources } from './Resources';

interface Props {
  article: Article;
}

export const ArticleCard = ({ article }: Props) => {
  const { dispatch } = useResources();
  return (
    <Card
      variant="forest"
      type="Article"
      onTypeClick={() => {
        dispatch({ type: 'FILTER', filterType: 'article' });
      }}
      title={article.fields.title}
      metaInfos={[
        ...(article.fields['author-is-thoughtleader']
          ? [
              {
                text: article.fields['author-is-thoughtleader']
                  .map((author) => author?.fields.Name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(article.fields.date
          ? [
              {
                text: new Date(article.fields.date).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(article.fields.duration
          ? [
              {
                text: (article.fields.duration / 60).toString() + ' min',
                icon: UilClockThree,
              },
            ]
          : []),
      ]}
      category={article.fields.category?.at(0)?.fields.Name}
      tags={[
        ...(article.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(article.fields.link),
                url: article.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
