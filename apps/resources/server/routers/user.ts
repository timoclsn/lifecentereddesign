import { clerkClient } from '@clerk/nextjs/server';
import { deleteUserData } from 'lib/resources';
import { protectedProcedure, router } from 'server/trpc';

export const userRouter = router({
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx.auth;
    await clerkClient.users.deleteUser(userId);
    await deleteUserData(userId);
  }),
});
