'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { createProtectedAction } from 'data/clients';
import { revalidatePath } from 'next/cache';

export const deleteAccount = createProtectedAction({
  action: async ({ ctx }) => {
    const { db, userId } = ctx;

    try {
      await clerkClient.users.deleteUser(userId);

      await db.like.deleteMany({
        where: {
          userId,
        },
      });

      await db.comment.deleteMany({
        where: {
          userId,
        },
      });

      revalidatePath('/');
    } catch (error) {
      throw new Error(
        'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.',
      );
    }
  },
});
