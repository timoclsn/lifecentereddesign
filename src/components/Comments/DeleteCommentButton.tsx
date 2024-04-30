'use client';

import { action } from '@/api/action';
import { Alert } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { useToast } from '@/ui/use-toast';
import { Loader2, Trash2 } from 'lucide-react';

interface Props {
  resourceId: number;
  commentId: number;
  commentUserId: string;
}

export const DeleteCommentButton = ({
  resourceId,
  commentId,
  commentUserId,
}: Props) => {
  const { toast } = useToast();

  const { isRunning, runAction } = useAction(action.resources.deleteComment, {
    onError: (error) => {
      toast({
        title: `❌ ${error}`,
        variant: 'destructive',
      });
    },
  });

  const handleDeleteAccount = () => {
    runAction({
      resourceId,
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
        className="ease flex items-center justify-center text-text-secondary transition-transform hover:scale-110 active:scale-90 disabled:opacity-80"
        disabled={isRunning}
      >
        {isRunning && <Loader2 size={16} className="animate-spin" />}
        {!isRunning && <Trash2 size={16} />}
        <span className="sr-only">Delete comment</span>
      </button>
    </Alert>
  );
};
