import { Await } from 'components/Await/Await';
import { Heading, Text } from 'design-system';
import { getCollectionsCached } from 'lib/cache';
import Link from 'next/link';

const CollectionsPage = async () => {
  const promise = getCollectionsCached();
  return (
    <div>
      <Heading level="2">Collections</Heading>
      <Await promise={promise}>
        {(collections) => {
          return (
            <ul>
              {collections.map(({ id, title, description, user }) => (
                <li key={id}>
                  <Link
                    href={`/collections/${id}`}
                    className="flex flex-col gap-2"
                  >
                    <Heading level="3">Title: {title}</Heading>
                    <Text>Description: {description}</Text>
                    <Text>Username: {user?.username ?? 'anonymos'}</Text>
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
      </Await>
    </div>
  );
};

export default CollectionsPage;
