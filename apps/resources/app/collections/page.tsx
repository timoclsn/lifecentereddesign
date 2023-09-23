import { auth } from '@clerk/nextjs';
import { Await } from 'components/Await/Await';
import { Page } from 'components/Page/Page';
import { Heading, Text } from 'design-system';
import { getCollectionsCached } from 'lib/cache';
import { SearchParams } from 'lib/types';
import Link from 'next/link';
import { AddCollectionButton } from '../../components/Collections/AddCollectionButton';

interface Props {
  searchParams: SearchParams;
}

const CollectionsPage = async ({ searchParams }: Props) => {
  const promise = getCollectionsCached();
  const { userId } = auth();
  return (
    <Page searchParams={searchParams}>
      <Heading level="2">Collections</Heading>
      {userId && <AddCollectionButton />}
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
    </Page>
  );
};

export default CollectionsPage;
