import { auth } from '@clerk/nextjs';
import { Resources } from 'app/resources/Resources/Resources';
import { Await } from 'components/Await/Await';
import { Page } from 'components/Page/Page';
import { Heading, Text } from 'design-system';
import { getCollectionCached } from 'lib/cache';
import { SearchParams } from 'lib/types';
import { DeleteCollectionButton } from '../../../components/Collections/DeleteCollectionButton/DeleteCollectionButton';
import { UpdateBollectionButton } from '../../../components/Collections/UpdateBollectionButton';

interface Props {
  params: {
    id: string;
  };
  searchParams: SearchParams;
}

const CollectionPage = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const promise = getCollectionCached(Number(id));
  const { userId } = auth();

  return (
    <Page searchParams={searchParams}>
      <div>
        <Heading>Collection Page</Heading>
        {userId && (
          <div className="flex flex-col items-start gap-4">
            <UpdateBollectionButton collectionId={Number(id)} />
            <DeleteCollectionButton collectionId={Number(id)} />
          </div>
        )}
      </div>
      <Await promise={promise}>
        {(collection) => {
          if (!collection) return <div>No collection found</div>;
          const isOwnCollection = collection.user?.id === userId;

          return (
            <div className="flex flex-col gap-4">
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
    </Page>
  );
};

export default CollectionPage;
