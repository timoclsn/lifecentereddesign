import { Await } from 'components/Await/Await';
import { Heading, Text } from 'design-system';
import { getCollectionCached } from 'lib/cache';

interface Props {
  params: {
    id: string;
  };
}

const CollectionPage = async ({ params }: Props) => {
  const { id } = params;
  const promise = getCollectionCached(Number(id));

  return (
    <div>
      <Heading>Collection Page</Heading>
      <Await promise={promise}>
        {(collection) => {
          if (!collection) return <div>No collection found</div>;

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
                        <li key={resource.id}>
                          {'title' in resource ? resource.title : resource.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        }}
      </Await>
    </div>
  );
};

export default CollectionPage;
