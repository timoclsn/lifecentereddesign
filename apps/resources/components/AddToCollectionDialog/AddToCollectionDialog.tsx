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
import { OpenServerDialog } from 'components/ServerDialog/OpenServerDialog';

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
                  <OpenServerDialog dialog="add-collection">
                    Add Collection
                  </OpenServerDialog>
                  <ul className="flex flex-col gap-4">
                    {userCollections.map((collection) => {
                      const state = resourceCollections.find(
                        (rc) => rc.id === collection.id,
                      );
                      return (
                        <li key={collection.id}>
                          <AddToCollectionItem
                            collection={collection}
                            initialState={!!state}
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
