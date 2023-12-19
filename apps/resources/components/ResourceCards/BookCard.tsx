import { Book } from 'data/resources/query';
import {
  Book as BookIcon,
  BookOpen,
  CalendarDays,
  QrCode,
  Tag,
} from 'lucide-react';
import { formateDate, getHostname } from '../../lib/utils/utils';
import { Card } from '../Card/Card';
import { thoughtleadersList, topicsList } from '../utils';

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Card
      resourceId={book.id}
      resourceType={book.type}
      variant="oak"
      displayType="Book"
      title={book.title}
      metaInfos={[
        ...(book.authors.length
          ? [
              {
                text: thoughtleadersList(book.authors),
                icon: BookOpen,
              },
            ]
          : []),
        ...(book.publishingDate
          ? [
              {
                text: formateDate(book.publishingDate),
                icon: CalendarDays,
              },
            ]
          : []),
        ...(book.publisher
          ? [
              {
                text: book.publisher,
                icon: BookIcon,
              },
            ]
          : []),
        ...(book.isbn
          ? [
              {
                text: book.isbn,
                icon: QrCode,
              },
            ]
          : []),
        ...(book.topics.length
          ? [
              {
                text: topicsList(book.topics),
                icon: Tag,
              },
            ]
          : []),
      ]}
      category={book.category?.name}
      tags={[
        ...(book.link
          ? [
              {
                text: getHostname(book.link),
                url: book.link,
              },
            ]
          : []),
      ]}
      suggestion={book.suggestion}
      note={book.note}
      showType
    />
  );
};
