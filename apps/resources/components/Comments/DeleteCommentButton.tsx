'use client';

import { action } from 'api/action';
import { Alert } from 'design-system';
import { useAction } from 'lib/data/client';
import { ContentType } from 'lib/resources';
import { Loader2, Trash2 } from 'lucide-react';

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
  const { isRunning, runAction } = useAction(action.resources.deleteComment, {
    onError: (error) => {
      console.error(error);
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
      description="Are you sure you want to delete this comment? This action cannot be undone."
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
        <span className="sr-only">Delete comment</span>
      </button>
    </Alert>
  );
};
