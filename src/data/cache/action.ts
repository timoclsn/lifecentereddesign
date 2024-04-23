'use server';

import { revalidatePath } from 'next/cache';
import { createAdminAction } from '../clients';

export const revalidateCache = createAdminAction({
  action: async () => {
    revalidatePath('/');
  },
});
