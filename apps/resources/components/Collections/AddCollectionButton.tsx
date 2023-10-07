'use client';

import { useServerDialog } from 'components/ServerDialog/useServerDialog';
import { Button } from 'design-system';

export const AddCollectionButton = () => {
  const { openDialog, isPending } = useServerDialog();
  return (
    <Button
      onClick={() => {
        openDialog('add-collection');
      }}
      disabled={isPending}
    >
      Add collection
    </Button>
  );
};
