import {
  BookOpen,
  Book as BookIcon,
  CalendarDays,
  Link,
  QrCode,
  Tag,
} from 'lucide-react';
import { Book } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card/Card';

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
                text: book.authors.map((author) => author.name).join(', '),
                icon: BookOpen,
              },
            ]
          : []),
        ...(book.publishingDate
          ? [
              {
                text: new Date(book.publishingDate).toLocaleDateString('en'),
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
                text: book.topics.map((topic) => topic.name).join(', '),
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
                icon: Link,
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
