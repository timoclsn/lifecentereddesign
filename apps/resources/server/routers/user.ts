import { clerkClient } from '@clerk/nextjs/server';
import { TRPCError } from '@trpc/server';
import { protectedProcedure, router } from 'server/trpc';

export const userRouter = router({
  greet: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx.auth;
    if (!userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return `Hello ${user?.emailAddresses[0].emailAddress}`;
  }),
});
