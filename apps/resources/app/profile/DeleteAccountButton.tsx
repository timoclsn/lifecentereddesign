'use client';

import { useAuth } from '@clerk/nextjs';
import { Button, InfoBox } from 'design-system';
import { AlertTriangle, CheckCircle2, Loader, XCircle } from 'lucide-react';
import { useAction } from '../../lib/actions/useAction';
import { deleteAccount } from './actions';

export const DeleteAccountButton = () => {
  const { isRunning, isSuccess, error, runAction } = useAction(deleteAccount, {
    onSuccess: () => {
      signOut();
    },
  });
  const { signOut } = useAuth();

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Do you really want to delete your account? This action can't be undone.",
      )
    ) {
      runAction();
    }
  };

  return (
    <>
      <Button color="danger" onClick={handleDeleteAccount} disabled={isRunning}>
        {isRunning ? <Loader className="animate-spin" /> : <XCircle />}
        Delete account
      </Button>

      {isSuccess && (
        <InfoBox
          variant="success"
          icon={<CheckCircle2 />}
          className="animate-in zoom-in-0 fade-in duration-150 ease-in-out"
        >
          Succesfully deleted your account! We are sad to see you go.
        </InfoBox>
      )}

      {error && (
        <InfoBox
          variant="error"
          icon={<AlertTriangle />}
          className="animate-in zoom-in-50 fade-in duration-150 ease-in-out"
        >
          Something went wrong while deleting your account. Please try again or
          contact us at hello@lifecentereddesign.net.
        </InfoBox>
      )}
    </>
  );
};
