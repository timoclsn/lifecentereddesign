'use client';

import { action } from '@/api/action';
import { Alert, Button, InfoBox } from '@/design-system';
import { useAction } from '@/lib/data/client';
import { useToast } from '@/ui/use-toast';
import { useAuth } from '@clerk/nextjs';
import { AlertTriangle, CheckCircle2, Loader2, XCircle } from 'lucide-react';

export const DeleteAccountButton = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const { isRunning, isSuccess, error, runAction } = useAction(
    action.users.deleteAccount,
    {
      onSuccess: () => {
        signOut();
      },
      onError: ({ error }) => {
        toast({
          title: `❌ ${error}`,
          variant: 'destructive',
        });
      },
    },
  );

  const handleDeleteAccount = () => {
    runAction();
  };

  return (
    <>
      <Alert
        title="Delete account"
        description="Are you sure you want to delete your account? This action can't be undone."
        actionText="Delete"
        onAction={handleDeleteAccount}
        destructive
      >
        <Button color="danger" disabled={isRunning}>
          {isRunning ? <Loader2 className="animate-spin" /> : <XCircle />}
          Delete account
        </Button>
      </Alert>

      {isSuccess && (
        <InfoBox
          variant="success"
          icon={<CheckCircle2 />}
          className="duration-150 ease-in-out animate-in fade-in zoom-in-0"
        >
          Succesfully deleted your account! We are sad to see you go.
        </InfoBox>
      )}

      {error && (
        <InfoBox
          variant="error"
          icon={<AlertTriangle />}
          className="duration-150 ease-in-out animate-in fade-in zoom-in-50"
        >
          Something went wrong while deleting your account. Please try again or
          contact us at hello@lifecentereddesign.net.
        </InfoBox>
      )}
    </>
  );
};
