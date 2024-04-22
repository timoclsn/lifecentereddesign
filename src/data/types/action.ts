'use server';

import { type } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { createAction, createAdminAction } from '../clients';
import { selectTypes } from './types';

export const getTypes = createAction({
  action: async () => {
    return await selectTypes();
  },
});

export const addType = createAdminAction({
  input: z.object({
    name: z.string(),
  }),
  action: async ({ input, ctx }) => {
    const { name } = input;
    const { db } = ctx;

    await db.insert(type).values({
      name,
    });

    revalidatePath('/');
  },
});
