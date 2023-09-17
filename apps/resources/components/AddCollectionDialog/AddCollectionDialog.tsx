import { ServerDialogRoot } from 'components/ServerDialog/ServerDialogRoot';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  Heading,
} from 'design-system';
import { AddCollectionForm } from './AddCollectionForm';

export const AddCollectionDialog = () => {
  return (
    <ServerDialogRoot>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <Heading level="3">Add Collection</Heading>
          <AddCollectionForm />
        </DialogContent>
      </DialogPortal>
    </ServerDialogRoot>
  );
};
