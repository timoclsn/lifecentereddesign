import { auth } from '@clerk/nextjs';
import { Await } from 'components/Await/Await';
import { ServerDialogRoot } from 'components/ServerDialog/ServerDialogRoot';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
} from 'design-system';
import { getResourceCollections, getUserCollections } from 'lib/collections';
import { ContentType } from 'lib/resources';
import { AddToCollectionItem } from './AddToCollectionItem';

interface Props {
  resourceId: number;
  resourceType: ContentType;
}

export const AddToCollectionDialog = ({ resourceId, resourceType }: Props) => {
  const { userId } = auth();
  if (!userId) return null;

  const dataPromises = Promise.all([
    getUserCollections(userId),
    getResourceCollections(resourceId, resourceType),
  ]);

  return (
    <ServerDialogRoot>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Add to Collection</Heading>
          <Await promise={dataPromises}>
            {([userCollections, resourceCollections]) => {
              return (
                <div>
                  {userCollections.map((collection) => {
                    const state = resourceCollections.find(
                      (rc) => rc.id === collection.id,
                    );
                    return (
                      <AddToCollectionItem
                        key={collection.id}
                        collection={collection}
                        initialState={!!state}
                        resourceId={resourceId}
                        resourceType={resourceType}
                      />
                    );
                  })}
                </div>
              );
            }}
          </Await>
        </DialogContent>
      </DialogPortal>
    </ServerDialogRoot>
  );
};
