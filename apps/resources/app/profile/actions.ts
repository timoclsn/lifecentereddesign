'use server';

import { clerkClient } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { createAction } from '../../lib/actions/createAction';
import { deleteUserData } from '../../lib/resources';

export const deleteAccount = createAction({
  action: async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      throw new Error('You must be logged in to delete your account.');
    }

    try {
      await clerkClient.users.deleteUser(userId);
      await deleteUserData(userId);
      revalidatePath('/');
    } catch (error) {
      throw new Error(
        'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.',
      );
    }
  },
});
