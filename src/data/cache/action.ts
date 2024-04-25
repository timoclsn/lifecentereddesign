'use server';

import { createAdminAction } from '../clients';
import { revalidateTag } from '../tags';

export const revalidateCache = createAdminAction({
  action: async () => {
    revalidateTag('all');
  },
});
