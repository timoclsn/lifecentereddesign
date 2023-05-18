import {
  UilBookReader,
  UilBooks,
  UilCalendarAlt,
  UilLinkAlt,
  UilQrcodeScan,
  UilTagAlt,
} from '@iconscout/react-unicons';
import { Book } from '../../lib/resources';
import { getHostname } from '../../lib/utils';
import { Card } from '../Card';
import { useResources } from '../Resources';

interface Props {
  book: Book;
}

export const BookCard = ({ book }: Props) => {
  const { dispatch, state } = useResources();
  const { inContext } = state;
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
                type: 'FILTER_BY_TYPE',
                typeIs: 'book',
              });
            }
          : undefined
      }
      onCategoryClick={
        inContext
          ? () => {
              dispatch({
                type: 'FILTER_BY_CATEGORY',
                category: book.category?.name,
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
        ...(book.topics.length
          ? [
              {
                text: book.topics.map((topic) => topic.name).join(', '),
                icon: UilTagAlt,
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
      suggestion={book.suggestion}
      note={book.note}
      showType
    />
  );
};
