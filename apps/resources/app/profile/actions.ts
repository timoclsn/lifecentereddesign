'use server';

import { auth, clerkClient } from '@clerk/nextjs';
import { deleteUserData } from 'lib/resources';

export const deleteAccount = async () => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'You must be logged in to delete your account.',
    };
  }

  try {
    await clerkClient.users.deleteUser(userId);
    await deleteUserData(userId);
  } catch (error) {
    return {
      error:
        'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.',
    };
  }

  return {
    error: '',
  };
};
