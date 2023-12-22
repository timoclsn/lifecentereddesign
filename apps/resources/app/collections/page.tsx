import { auth } from '@clerk/nextjs';
import { query } from 'api/query';
import { Await } from 'components/Await/Await';
import { AddCollectionDialog } from 'components/Collections/AddCollectionDialog/AddCollectionDialog';
import { Button, Heading, Text } from 'design-system';
import Link from 'next/link';

const CollectionsPage = async () => {
  const promise = query.collections.getCollections();
  const { userId } = auth();
  return (
    <>
      <Heading level="2">Collections</Heading>
      {userId && (
        <AddCollectionDialog>
          <Button>Add Collection</Button>
        </AddCollectionDialog>
      )}
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
                  <div>----------------------------------</div>
                </li>
              ))}
            </ul>
          );
        }}
      </Await>
    </>
  );
};

export default CollectionsPage;
