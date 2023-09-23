'use client';

import { useServerDialog } from 'components/ServerDialog/useServerDialog';
import { Button } from 'design-system';

interface Props {
  collectionId: number;
}

export const UpdateBollectionButton = ({ collectionId }: Props) => {
  const { openDialog, isPending } = useServerDialog();
  return (
    <Button
      onClick={() => {
        openDialog('update-collection', {
          collectionId,
        });
      }}
      disabled={isPending}
    >
      Update collection
    </Button>
  );
};
