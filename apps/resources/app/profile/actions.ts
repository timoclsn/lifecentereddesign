'use server';

import { auth, clerkClient } from '@clerk/nextjs';
import { createAction } from '../../lib/actions/createAction';
import { deleteUserData } from '../../lib/resources';

export const deleteAccount = createAction()(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error('You must be logged in to delete your account.');
  }

  try {
    await clerkClient.users.deleteUser(userId);
    await deleteUserData(userId);
  } catch (error) {
    throw new Error(
      'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.',
    );
  }
});
