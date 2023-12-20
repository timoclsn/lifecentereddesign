'use client';

import { action } from 'api/action';
import { Alert, Button } from 'design-system';
import { useAction } from 'lib/data/client';

interface Props {
  collectionId: number;
}

export const DeleteCollectionButton = ({ collectionId }: Props) => {
  const { isRunning, runAction } = useAction(
    action.collections.deleteCollection,
  );
  const handleDeleteAccount = () => {
    runAction({
      collectionId,
    });
  };
  return (
    <Alert
      title="Delete collection"
      description="Are you sure you want to delete this collection? This action cannot be undone."
      actionText="Delete"
      onAction={handleDeleteAccount}
      destructive
    >
      <Button disabled={isRunning}>Delete collection</Button>
    </Alert>
  );
};
