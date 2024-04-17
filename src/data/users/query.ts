import { clerkClient } from '@clerk/nextjs/server';
import { createProtectedQuery } from '../clients';

export const canEdit = createProtectedQuery({
  cache: {
    noStore: true,
  },
  query: async ({ ctx }) => {
    const { userId } = ctx;

    const fullUserData = await clerkClient.users.getUser(userId);
    const canEdit = fullUserData?.privateMetadata['canAdd'] as
      | boolean
      | undefined;

    return canEdit;
  },
});
