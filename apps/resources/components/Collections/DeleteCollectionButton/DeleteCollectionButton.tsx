'use client';

import { Alert, Button } from 'design-system';
import { useAction } from 'lib/actions/useAction';
import { useRouter } from 'next/navigation';
import { deleteCollection } from './actions';

interface Props {
  collectionId: number;
}

export const DeleteCollectionButton = ({ collectionId }: Props) => {
  const { push } = useRouter();
  const { isRunning, runAction } = useAction(deleteCollection);
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
