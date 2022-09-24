import {
  UilBookReader,
  UilBooks,
  UilCalendarAlt,
  UilLinkAlt,
  UilQrcodeScan,
} from '@iconscout/react-unicons';
import { Card } from 'design-system';
import { Book } from '../lib/content';
import { getHostname } from '../lib/utils';

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Card
      variant="oak"
      type="Book"
      title={book.fields.Title}
      metaInfos={[
        ...(book.fields.Authors
          ? [
              {
                text: book.fields.Authors.map(
                  (author) => author?.fields.Name
                ).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(book.fields['Publishing Date']
          ? [
              {
                text: new Date(
                  book.fields['Publishing Date']
                ).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(book.fields.Publisher
          ? [
              {
                text: book.fields.Publisher,
                icon: UilBooks,
              },
            ]
          : []),
        ...(book.fields.ISBN
          ? [
              {
                text: book.fields.ISBN,
                icon: UilQrcodeScan,
              },
            ]
          : []),
      ]}
      category={book.fields.Category?.at(0)?.fields.Name}
      tags={[
        ...(book.fields.Link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(book.fields.Link),
                url: book.fields.Link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
