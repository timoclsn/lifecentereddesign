'use server';

import { clerkClient } from '@clerk/nextjs';
import { createProtectedAction } from 'lib/serverActions/create';
import { revalidatePath } from 'next/cache';
import { deleteUserData } from '../../lib/resources';

export const deleteAccount = createProtectedAction({
  action: async ({ ctx }) => {
    const { userId } = ctx;

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
