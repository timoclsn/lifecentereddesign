import {
  UilBookReader,
  UilBooks,
  UilCalendarAlt,
  UilLinkAlt,
  UilQrcodeScan,
} from '@iconscout/react-unicons';
import { Book } from '../lib/content';
import { getHostname } from '../lib/utils';
import { Card } from './Card';

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  return (
    <Card
      variant="oak"
      type="Book"
      title={book.Title}
      metaInfos={[
        ...(book.Authors
          ? [
              {
                text: book.Authors.map((author) => author.Name).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(book['Publishing Date']
          ? [
              {
                text: new Date(book['Publishing Date']).toLocaleDateString(
                  'en'
                ),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(book.Publisher
          ? [
              {
                text: book.Publisher,
                icon: UilBooks,
              },
            ]
          : []),
        ...(book.ISBN
          ? [
              {
                text: book.ISBN,
                icon: UilQrcodeScan,
              },
            ]
          : []),
      ]}
      category={book.Category[0].Name}
      tags={[
        {
          icon: UilLinkAlt,
          text: getHostname(book.Link),
          url: book.Link,
        },
      ]}
      showType
    />
  );
};
