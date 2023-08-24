'use client';

import { Loader, Trash2 } from 'lucide-react';
import { useAction } from '../../lib/actions/useAction';
import { deleteComment } from './actions';

interface Props {
  commentId: number;
  commentUserId: string;
}

export const DeleteCommentButton = ({ commentId, commentUserId }: Props) => {
  const { isRunning, runAction } = useAction(deleteComment, {
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Do you really want to delete your comment? This action can't be undone.",
      )
    ) {
      runAction({
        commentId,
        commentUserId,
      });
    }
  };
  return (
    <button
      className="text-text-secondary ease flex items-center justify-center transition-transform hover:scale-110 active:scale-90"
      onClick={handleDeleteAccount}
    >
      {isRunning && <Loader size={16} className="animate-spin" />}
      {!isRunning && <Trash2 size={16} />}
      <span className="sr-only">Delete comment</span>
    </button>
  );
};
