'use client';

import { Alert } from 'design-system';
import { useAction } from 'lib/actions/useAction';
import { Loader2, Trash2 } from 'lucide-react';
import { deleteCollection } from './actions';
import { useRouter } from 'next/navigation';

interface Props {
  collectionId: number;
}

export const DeleteCollectionButton = ({ collectionId }: Props) => {
  const { push } = useRouter();
  const { isRunning, runAction } = useAction(deleteCollection, {
    onSuccess: () => {
      push('/collections');
    },
    onError: (error) => {
      console.log(error);
    },
  });
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
      <button
        className="text-text-secondary ease flex items-center justify-center transition-transform hover:scale-110 active:scale-90 disabled:opacity-80"
        disabled={isRunning}
      >
        {isRunning && <Loader2 size={16} className="animate-spin" />}
        {!isRunning && <Trash2 size={16} />}
        <span className="sr-only">Delete collection</span>
      </button>
    </Alert>
  );
};
