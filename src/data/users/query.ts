import { isAdmin as isAdminLib } from '@/lib/users';
import { createProtectedQuery } from '../clients';

export const isAdmin = createProtectedQuery({
  cache: {
    noStore: true,
  },
  query: async ({ ctx }) => {
    const { userId } = ctx;

    return await isAdminLib(userId);
  },
});
