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
      variant="oak"
      type="Book"
      onTypeClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER',
                filterType: filteredType === 'book' ? null : 'book',
              });
            }
          : undefined
      }
      title={book.fields.title}
      metaInfos={[
        ...(book.fields.authors
          ? [
              {
                text: book.fields.authors
                  .map((author) => author?.fields.Name)
                  .join(', '),
                icon: UilBookReader,
              },
            ]
          : []),
        ...(book.fields['publishing-date']
          ? [
              {
                text: new Date(
                  book.fields['publishing-date']
                ).toLocaleDateString('en'),
                icon: UilCalendarAlt,
              },
            ]
          : []),
        ...(book.fields.publisher
          ? [
              {
                text: book.fields.publisher,
                icon: UilBooks,
              },
            ]
          : []),
        ...(book.fields.isbn
          ? [
              {
                text: book.fields.isbn,
                icon: UilQrcodeScan,
              },
            ]
          : []),
      ]}
      category={book.fields.category?.at(0)?.fields.name}
      tags={[
        ...(book.fields.link
          ? [
              {
                icon: UilLinkAlt,
                text: getHostname(book.fields.link),
                url: book.fields.link,
              },
            ]
          : []),
      ]}
      showType
    />
  );
};
