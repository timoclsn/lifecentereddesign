import { Await } from 'components/Await/Await';
import { ServerDialogRoot } from 'components/ServerDialog/ServerDialogRoot';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
} from 'design-system';
import { getCollection } from 'lib/collections';
import { UpdateCollectionForm } from './UpdateCollectionForm';

interface Props {
  collectionId: number;
}

export const UpdateCollectionDialog = ({ collectionId }: Props) => {
  const promise = getCollection(collectionId);
  return (
    <ServerDialogRoot>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Update Collection</Heading>
          <Await promise={promise}>
            {(collection) => {
              if (!collection) return null;
              return (
                <UpdateCollectionForm
                  collectionId={collection.id}
                  title={collection.title}
                  description={collection.description}
                />
              );
            }}
          </Await>
        </DialogContent>
      </DialogPortal>
    </ServerDialogRoot>
  );
};
