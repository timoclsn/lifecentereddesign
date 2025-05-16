'use server';

import { createProtectedAction } from '@/data/clients';
import { comment, like } from '@/db/schema';
import { ActionError } from '@/lib/data/errors';
import { clerkClient } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteAccount = createProtectedAction({
  action: async ({ ctx }) => {
    const { db, userId } = ctx;

    const deleteAccountError =
      'Something went wrong while deleting your account. Please try again or contact us at hello@lifecentereddesign.net.';

    await db
      .delete(like)
      .where(eq(like.userId, userId))
      .catch((error) => {
        throw new ActionError({
          message: deleteAccountError,
          log: `Delete likes for user ${userId} failed`,
          cause: error,
        });
      });

    await db
      .delete(comment)
      .where(eq(comment.userId, userId))
      .catch((error) => {
        throw new ActionError({
          message: deleteAccountError,
          log: `Delete comments for user ${userId} failed`,
          cause: error,
        });
      });

    const client = await clerkClient();
    client.users.deleteUser(userId).catch((error) => {
      throw new ActionError({
        message: deleteAccountError,
        log: `Delete clerk user ${userId} failed`,
        cause: error,
      });
    });

    revalidatePath('/');
  },
});
