'use client';

import { Loader2, Trash2 } from 'lucide-react';
import { useAction } from '../../lib/actions/useAction';
import { deleteComment } from './actions';
import { ContentType } from '../../lib/resources';
import { Alert } from 'design-system';

interface Props {
  resourceId: number;
  resourceType: ContentType;
  commentId: number;
  commentUserId: string;
}

export const DeleteCommentButton = ({
  resourceId,
  resourceType,
  commentId,
  commentUserId,
}: Props) => {
  const { isRunning, runAction } = useAction(deleteComment, {
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDeleteAccount = () => {
    runAction({
      resourceId,
      resourceType,
      commentId,
      commentUserId,
    });
  };
  return (
    <Alert
      title="Delete comment"
      actionText="Delete"
      onAction={handleDeleteAccount}
    >
      <button
        className="text-text-secondary ease flex items-center justify-center transition-transform hover:scale-110 active:scale-90 disabled:opacity-80"
        disabled={isRunning}
      >
        {isRunning && <Loader2 size={16} className="animate-spin" />}
        {!isRunning && <Trash2 size={16} />}
        <span className="sr-only">Delete comment</span>
      </button>
    </Alert>
  );
};
