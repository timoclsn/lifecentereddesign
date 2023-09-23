import { auth } from '@clerk/nextjs';
import { Await } from 'components/Await/Await';
import { AddCollectionButton } from 'components/Collections/AddCollectionButton';
import { ServerDialogRoot } from 'components/ServerDialog/ServerDialogRoot';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
} from 'design-system';
import { getCollectionsCached, getResourceCollectionsCached } from 'lib/cache';
import { ContentType } from 'lib/resources';
import { AddToCollectionItem } from './AddToCollectionItem';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const AddToCollectionDialog = ({ resourceId, resourceType }: Props) => {
  const { userId } = auth();
  if (!userId) return null;

  const promise = Promise.all([
    getCollectionsCached(),
    getResourceCollectionsCached(resourceId, resourceType),
  ]);

  return (
    <ServerDialogRoot>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Add to Collection</Heading>
          <Await promise={promise}>
            {([collections, resourceCollections]) => {
              const userCollections = collections.filter(
                (collection) => collection.userId === userId,
              );

              return (
                <div>
                  <AddCollectionButton />
                  <ul className="flex flex-col gap-4">
                    {userCollections.map((collection) => {
                      const state = resourceCollections.find(
                        (rc) => rc.id === collection.id,
                      );
                      return (
                        <li key={collection.id}>
                          <AddToCollectionItem
                            collectionId={collection.id}
                            collectionTitle={collection.title}
                            checked={!!state}
                            resourceId={resourceId}
                            resourceType={resourceType}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            }}
          </Await>
        </DialogContent>
      </DialogPortal>
    </ServerDialogRoot>
  );
};
