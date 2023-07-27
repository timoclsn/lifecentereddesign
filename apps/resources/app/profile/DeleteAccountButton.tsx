'use client';

import { CheckCircle2, AlertTriangle, Loader, XCircle } from 'lucide-react';
import { Button, InfoBox } from 'design-system';
import { useState } from 'react';
import { deleteAccount } from './actions';
import { useAuth } from '@clerk/nextjs';

export const DeleteAccountButton = () => {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Do you really want to delete your account? This action can't be undone."
      )
    ) {
      setIsLoading(true);
      setIsSuccess(false);
      setError('');

      const { error } = await deleteAccount();

      if (error) {
        setError(error);
        return;
      }

      setIsSuccess(true);
      signOut();
    }
  };

  return (
    <>
      <Button color="danger" onClick={handleDeleteAccount} disabled={isLoading}>
        {isLoading ? <Loader className="animate-spin" /> : <XCircle />}
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