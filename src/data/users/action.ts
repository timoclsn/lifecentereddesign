'use server';

import { createProtectedAction } from '@/data/clients';
import { comment, like } from '@/db/schema';
import { clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteAccount = createProtectedAction({
  action: async ({ ctx }) => {
    const { db, userId } = ctx;

    try {
      await clerkClient.users.deleteUser(userId);

      await db.delete(like).where(eq(like.userId, userId));

      await db.delete(comment).where(eq(comment.userId, userId));
      
      revalidatePath('/');
    } catch (error) {
      throw new Error(
        'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.',
      );
    }
  },
});
