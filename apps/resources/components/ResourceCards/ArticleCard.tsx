import { BookOpen, CalendarDays, Clock3, Link, Tag } from 'lucide-react';
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
      title={article.title}
      metaInfos={[
        ...(article.authors.length
          ? [
              {
                text: article.authors.map((author) => author?.name).join(', '),
                icon: BookOpen,
              },
            ]
          : []),
        ...(article.authorsPlain
          ? [
              {
                text: article.authorsPlain,
                icon: BookOpen,
              },
            ]
          : []),
        ...(article.date
          ? [
              {
                text: new Date(article.date).toLocaleDateString('en'),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(article.datePlain
          ? [
              {
                text: article.datePlain,
                icon: CalendarDays,
              },
            ]
          : []),
        ...(article.duration
          ? [
              {
                text: `${article.duration} min`,
                icon: Clock3,
              },
            ]
          : []),
        ...(article.topics.length
          ? [
              {
                text: article.topics.map((topic) => topic.name).join(', '),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={article.category?.name}
      tags={[
        ...(article.link
          ? [
              {
                icon: Link,
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
