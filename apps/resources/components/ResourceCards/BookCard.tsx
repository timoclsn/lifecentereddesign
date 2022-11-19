import {
  UilBookReader,
  UilBooks,
  UilCalendarAlt,
  UilLinkAlt,
  UilQrcodeScan,
} from '@iconscout/react-unicons';
import { Book } from '../../lib/content';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext, filteredType } = state;
  return (
    <Card
      resourceId={book.id}
      resourceType={book.type}
      variant="oak"
      displayType="Book"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'BOOK' ? 'ALL' : 'BOOK',
              });
            }
          : undefined
      }
      title={book.title}
      metaInfos={[
        ...(book.authors.length
          ? [
              {
                text: book.authors.map((author) => author.name).join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(book.publishingDate
          ? [
              {
                text: new Date(book.publishingDate).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(book.publisher
          ? [
              {
                text: book.publisher,
                icon: UilBooks,
              },
            ]
          : []),
        ...(book.isbn
          ? [
              {
                text: book.isbn,
                icon: UilQrcodeScan,
              },
            ]
          : []),
      ]}
      category={book.category?.name}
      tags={[
        ...(book.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(book.link),
                url: book.link,
              },
            ]
          : []),
      ]}
      likes={book.likes}
      showType
    />
  );
};
