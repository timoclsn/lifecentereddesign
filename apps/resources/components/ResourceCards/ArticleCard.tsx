import { BookOpen, CalendarDays, Clock3, Tag } from 'lucide-react';
import { Article } from '../../lib/resources';
import { formateDate, getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

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
                text: thoughtleadersList(article.authors),
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
                text: formateDate(article.date),
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
                text: topicsList(article.topics),
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
