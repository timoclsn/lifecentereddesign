import { auth } from '@clerk/nextjs/server';
import { query } from 'api/query';
import { Resources } from 'app/resources/Resources/Resources';
import { Await } from 'components/Await/Await';
import { UpdateCollectionDialog } from 'components/Collections/UpdateCollectionDialog/UpdateCollectionDialog';
import { Button, Heading, Text } from 'design-system';
import { SearchParams } from 'lib/types';
import { notFound } from 'next/navigation';
import { DeleteCollectionButton } from '../../../components/Collections/DeleteCollectionButton/DeleteCollectionButton';

interface Props {
  params: {
    id: string;
  };
  searchParams: SearchParams;
}

const CollectionPage = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const promise = query.collections.getCollection({ id: Number(id) });
  const { userId } = auth();

  return (
    <>
      <Heading>Collection Page</Heading>
      <Await promise={promise}>
        {(collection) => {
          if (!collection) {
            notFound();
          }
          const isOwnCollection = collection.user?.id === userId;

          return (
            <div className="flex flex-col gap-4">
              {isOwnCollection && (
                <div className="flex flex-col items-start gap-4">
                  <UpdateCollectionDialog
                    collectionId={Number(id)}
                    collectionTitle={collection.title}
                    collectionDescription={collection.description}
                  >
                    <Button>Update Collection</Button>
                  </UpdateCollectionDialog>
                  <DeleteCollectionButton collectionId={Number(id)} />
                </div>
              )}

              <div className="flex flex-col gap-2">
                <Heading>Title: {collection.title}</Heading>
                <Text>Description: {collection.description}</Text>
                <Text>Username: {collection.user?.username ?? 'anonymos'}</Text>
              </div>
              {collection.resources.length === 0 ? (
                <div>No resources in collection</div>
              ) : (
                <div>
                  Resources:
                  <ul className="flex flex-col gap-2">
                    {collection.resources.map((resource) => {
                      return (
                        <>
                          <li key={`${resource.id}-${resource.type}`}>
                            {'title' in resource
                              ? resource.title
                              : resource.name}
                          </li>
                          <div>----------------------------------</div>
                        </>
                      );
                    })}
                  </ul>
                </div>
              )}
              {isOwnCollection && <Resources searchParams={searchParams} />}
            </div>
          );
        }}
      </Await>
    </>
  );
};

export default CollectionPage;
